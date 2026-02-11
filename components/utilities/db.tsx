import AsyncStorage from "@react-native-async-storage/async-storage";

type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonValue[]
    | { [key: string]: JsonValue };

class PersistentStorage {
    private cache: Record<string, JsonValue | undefined> = {};
    private initialized = false;

    constructor() {
        this.initializeLocalCache();
    }

    /**
     * Called during initialization to load all keys from disk into memory.
     * Allows for easier synchronous access later.
     */
    private async initializeLocalCache() {
        const keys = await AsyncStorage.getAllKeys();
        const entries = await AsyncStorage.multiGet(keys);

        entries.forEach(([key, value]) => {
            if (value != null) {
                try {
                    this.cache[key] = JSON.parse(value);
                } catch {
                    this.cache[key] = value as any;
                }
            }
        });

        this.initialized = true;
    }

    /**
     * Async save (writes to disk first, then updates local memory cache)
     */
    async saveDataAsync(key: string, obj: JsonValue) {
        const json = JSON.stringify(obj);
        await AsyncStorage.setItem(key, json);
        this.cache[key] = obj;
    }

    /**
     * Sync save (Update local cache first, then fire-and-forget the disk write)
     * Good for students who don't want await everywhere.
     */
    saveDataSync(key: string, obj: JsonValue) {
        this.cache[key] = obj;

        // write to disk in the background
        AsyncStorage.setItem(key, JSON.stringify(obj)).catch((err) =>
            console.warn("Storage write failed:", err)
        );
    }

    /**
     * Async load (ensures disk read if not cached)
     */
    async loadDataAsync(key: string): Promise<JsonValue | null> {
        if (this.cache[key] !== undefined) {
            return this.cache[key] as JsonValue;
        }

        const value = await AsyncStorage.getItem(key);
        if (!value) return null;

        try {
            const parsed = JSON.parse(value);
            this.cache[key] = parsed;
            return parsed as JsonValue;
        } catch {
            return value as JsonValue;
        }
    }

    /**
     * Sync load (from memory only)
     * Will return null if initializeLocalCache hasn’t run.
     */
    loadDataSync(key: string): JsonValue | null {
        if (!this.initialized) {
            console.warn(
                "PersistentStorage not initialized. Call initializeLocalCache() first."
            );
        }

        return this.cache[key] as JsonValue | null;
    }

    /**
     * Async clear (wipes both memory and disk)
     */
    async clearAllAsync() {
        await AsyncStorage.clear();   // wipe disk
        this.cache = {};              // wipe local memory
    }

    /**
     * Sync clear (wipes both memory and disk)
     */
    clearAllSync() {
        this.cache = {};              // wipe local memory immediately

        AsyncStorage.clear().catch((err) =>
            console.warn("Failed to clear storage:", err)
        );
    }
}

export const Storage = new PersistentStorage();
