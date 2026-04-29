"use server";

import { db } from "@/db";
import { scriptsTable, settingsTable } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// --- Scripts ---

export async function getScripts() {
  try {
    const scripts = await db.select().from(scriptsTable).orderBy(desc(scriptsTable.updatedAt));
    return scripts;
  } catch (error) {
    console.error("Error fetching scripts:", error);
    return [];
  }
}

export async function getScriptById(id: string) {
  try {
    const script = await db.select().from(scriptsTable).where(eq(scriptsTable.id, id)).limit(1);
    return script[0] || null;
  } catch (error) {
    console.error("Error fetching script by id:", error);
    return null;
  }
}

export async function createScript() {
  try {
    const newScript = await db.insert(scriptsTable).values({
      title: "Novo Script",
      content: "",
    }).returning();
    
    revalidatePath("/scriptLibrary");
    return newScript[0];
  } catch (error) {
    console.error("Error creating script:", error);
    return null;
  }
}

export async function updateScript(id: string, title: string, content: string) {
  try {
    const updatedScript = await db.update(scriptsTable)
      .set({ title, content, updatedAt: new Date() })
      .where(eq(scriptsTable.id, id))
      .returning();
      
    revalidatePath("/scriptLibrary");
    revalidatePath("/scriptEditor");
    return updatedScript[0];
  } catch (error) {
    console.error("Error updating script:", error);
    return null;
  }
}

export async function deleteScript(id: string) {
  try {
    await db.delete(scriptsTable).where(eq(scriptsTable.id, id));
    revalidatePath("/scriptLibrary");
    return true;
  } catch (error) {
    console.error("Error deleting script:", error);
    return false;
  }
}

// --- Settings ---

export async function getSettings() {
  try {
    // Busca as configs onde id = 1
    const settings = await db.select().from(settingsTable).where(eq(settingsTable.id, 1)).limit(1);
    
    if (settings.length > 0) {
      return settings[0];
    } else {
      // Cria a config padrão se não existir
      const newSettings = await db.insert(settingsTable).values({
        id: 1,
        mirroring: true,
        theme: "dark",
        speed: 145,
        fontSize: 110,
      }).returning();
      return newSettings[0];
    }
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}

export async function updateSettings(data: { mirroring?: boolean, theme?: string, speed?: number, fontSize?: number }) {
  try {
    // Garante que existe antes de atualizar
    await getSettings();
    
    const updatedSettings = await db.update(settingsTable)
      .set(data)
      .where(eq(settingsTable.id, 1))
      .returning();
      
    revalidatePath("/teleprompterSettings");
    revalidatePath("/teleprompterMode");
    return updatedSettings[0];
  } catch (error) {
    console.error("Error updating settings:", error);
    return null;
  }
}
