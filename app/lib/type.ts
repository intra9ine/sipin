

export type NavbarDropDownDataItem = {
    id: number;
    title: string;
    isSelectedNav: boolean;
    link:string;
  };
  
  export interface UserProps {
    user_id: number;
    email: string;
    scheme_id: number;
    last_name: string;
    first_name: string;
    password: string;
    phone_number?: string | null;
    status?: 'Pending' | 'Active' | 'InActive';
    type?: 'Normal' | 'Basic' | 'Standard' | 'Premium' | 'Trial';
    createdAt?: string; // or Date
    updatedAt?: string; // or Date
    doc?: string | null;
  }
  

export interface EventItem {
  id: number;
  imageData: string;
  duration: string;
  month: string;
  year: string;
  title: string;
  status: string;
  location: string;
}

export interface ReportItem {
  id: number;
  image: string;
  date: string;
  month: string;
  para: string;
}

export interface FormState {
  fullName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  passwordMatchError: string;
  phoneInputError:string;
}

export interface LoginFormProps{
  email: string;
  password: string;
  showPassword: boolean;
}


export type FetchResponse<T = unknown> =
  | { status: "success"; data: T|string  } // For GET responses
  | { status: "error"; data: string }; // For error handling

  export type TableCellType =
  | { type: 'text'; value: string }
  | { type: 'number'; value: number }
  | { type: 'text'; value: number }
  | { type: 'input'; value: string; onChange: (val: string) => void }
  | { type: 'select'; value: string; options: string[]; onChange: (val: string) => void }
  | { type: 'actions'; buttons: { label: string; onClick: () => void; variant?: 'edit' | 'delete' | 'view' }[] };

export interface TableProps {
  headers: string[];
  rows: TableCellType[][];
}