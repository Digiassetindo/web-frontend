import { useState } from 'react';

export const useForm = (initialValue: any): Array<any> => {
  const [value, setValue] = useState<any>(initialValue);
  return [
   value,
   (e: any) => setValue({
      ...value,
      [e.target.name]: e.target.value
   }),
   (newValue?: any) => setValue({
      ...value,
      ...newValue
   })
  ];
};
