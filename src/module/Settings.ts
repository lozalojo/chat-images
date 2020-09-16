import Utils from "./Utils";

class Settings {
    private static _instance: Settings;

    private constructor() {
    }

    public static getInstance(): Settings {
        if (!Settings._instance) Settings._instance = new Settings();
        return Settings._instance;
    }
    
    private getSettings(): Array<any> {
        return [
            {
                key: "warningOnDrop",
                settings: {
                    name: "Warning on drop",
                    hint: "Enables a warning dialog when dropping a file in the chat.",
                    type: Boolean,
                    default: false,
                    scope: "world",
                    config: true,
                },
            },
            {
                key: "warningOnPaste",
                settings: {
                    name: "Warning on paste",
                    hint: "Enables a warning dialog when pasting a file in the chat.",
                    type: Boolean,
                    default: false,
                    scope: "world",
                    config: true,
                },
            },
            {
                key: "whereToSavePastedImages",
                settings: {
                    name: "Files save location",
                    hint: "Do to me not having money to save images on a server you will have to choose where to save them: " +
                        "on your machine in data\\chat-images or chat.db. Some guy told me is better to save them in the data folder " +
                        "¯\\_(ツ)_/¯. This setting applies to copy pasted and drag & dropped files, links don't need to be saved." +
                        "WARNING: YOU NEED TO GIVE PLAYERS FILE UPLOAD PERMISSION IF YOU ARE USING THE DATA FOLDER OPTION!!!",
                    type: String,
                    default: "database",
                    choices: {dataFolder: "Data folder", database: "Database"},
                    scope: "world",
                    config: true,
                    restricted: true,
                },
            },
        ];
    }

    public getSetting(key: string): any {
        return game?.settings?.get(Utils.moduleName, key);
    }

    public getUploadFolderPath(): string {
        return 'UploadedChatImages';
    }

    public registerSettings(): void {
        this.getSettings().forEach((setting) => {
            game?.settings?.register(Utils.moduleName, setting.key, setting.settings);
        });
    }

    public async createChatImageFolderIfMissing(): Promise<void> {
        const source = 'data';
        const target = '.';
        const uploadFolder = this.getUploadFolderPath();

        let base = await FilePicker.browse(source, uploadFolder);
        if (base.target === target) {
            await FilePicker.createDirectory(source, uploadFolder, {});
        }
    }
}
export default Settings.getInstance();
