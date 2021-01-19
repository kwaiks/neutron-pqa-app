import axios from 'axios';
import {File} from '../types/file';

export default async function getFiles(): Promise<File[]> {
    try {
        const { data } = await axios.get<File[]>('http://localhost:4003/files');
        return data;
    } catch (err) {
        console.error(err);
        return [];
    }
}