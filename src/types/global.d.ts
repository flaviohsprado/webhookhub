export type Appointment = {
   status: string;
   value: string;
   type: "CHECK_UP" | "FOLLOW_UP" | "CONSULTATION" | "PROCEDURE" | "TELEMEDICINE";
   id: string;
   appointmentDate: Date;
   createdAt: Date;
   updatedAt: Date | null;
   clinic: Clinic;
   patient: Patient;
   provider: Provider;
}

export type Clinic = {
   name: string;
   email: string;
   phone: string;
   cnpj: string;
   address: string;
   number: string;
   complement: string;
   city: string;
   state: string;
   zipCode: string;
}

export type Patient = {
   name: string;
   email: string;
   phone: string;
   dateOfBirth: Date;
   gender: string;
   cpf: string;
}


export type Provider = {
   name: string;
   email: string;
   phone: string;
   specialty: string;
   crm: string;
}