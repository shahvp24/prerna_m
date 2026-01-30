"use client";

import React, { createContext, useContext, useState } from "react";

type CursorContextType = {
    cursorText: string;
    setCursorText: (text: string) => void;
    cursorVariant: "default" | "text" | "button";
    setCursorVariant: (variant: "default" | "text" | "button") => void;
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: React.ReactNode }) {
    const [cursorText, setCursorText] = useState("");
    const [cursorVariant, setCursorVariant] = useState<"default" | "text" | "button">("default");

    return (
        <CursorContext.Provider value={{ cursorText, setCursorText, cursorVariant, setCursorVariant }}>
            {children}
        </CursorContext.Provider>
    );
}

export function useCursor() {
    const context = useContext(CursorContext);
    if (context === undefined) {
        throw new Error("useCursor must be used within a CursorProvider");
    }
    return context;
}
