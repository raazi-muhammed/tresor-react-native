import React, { ReactNode } from "react";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "./migration";

export function DbProvider({ children }: { children: ReactNode }) {
    return (
        <SQLiteProvider databaseName="test4.db" onInit={migrateDbIfNeeded}>
            {children}
        </SQLiteProvider>
    );
}
