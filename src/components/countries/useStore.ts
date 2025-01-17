import { create } from 'zustand'
import { typeCountries } from '../../type/Type';

interface IStore {
    countries: typeCountries[]
    getCountries: (countries: typeCountries[]) => void  
}

export const useStore = create<IStore>((set) => ({
  
    countries: [],
    getCountries: (countries) => {
        set({countries})
    }

}))
