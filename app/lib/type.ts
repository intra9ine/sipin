

export type NavbarDropDownDataItem = {
    id: number;
    title: string;
    isSelectedNav: boolean;
    link:string;
  };
  


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
  companyName: string;
  companySector:string;
  password: string;
  confirmPassword: string;
  companyDoc: File | null;
  domain: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  passwordMatchError: string;
  fileSizeError: string;
}