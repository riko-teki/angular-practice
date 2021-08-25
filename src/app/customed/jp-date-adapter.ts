import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable({
    providedIn: 'root',
})
export class JPDateAdapter extends NativeDateAdapter {
    getDateNames(): string[] {
        const dateNames: string[] = [];
        for (let i = 0; i < 31; i++) {
            dateNames[i] = String(i + 1);
        }
        return dateNames;
    }
}