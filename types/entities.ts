export type IDocument = {
    id: number;
    title: string;
    caption?: string;
    uri?: string;
    height?: number;
    width?: number;
};

export type IImage = {
    image_id?: number;
    uri: string;
    height: number;
    width: number;
};

export type IField = {
    field_id: number;
    key: string;
    value: string;
};
