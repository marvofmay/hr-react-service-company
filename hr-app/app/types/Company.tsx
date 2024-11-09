import Industry from './Industry'; 
import File from './File';

export default interface Company {
  uuid: string;               
  company_uuid: string | null; 
  full_name: string;          
  short_name: string | null;  
  description: string | null;
  nip: string;                
  regon: string;             
  industry: Industry | null;  
  logo: File | null;         
  active: boolean;           
  created_at: string;         
  updated_at: string;         
  deleted_at: string | null;  
}