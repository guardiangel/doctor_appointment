export interface UserLoginState {
  id: string;
  userId: string;
  type: string; //1 admin, 2 doctor, 3,patient
}

export interface UserEntity {
  id: string;
  userId: string;
  password: string;
  userName: string;
  address: string;
  phone: string;
  email: string;
  type: string;
  gender: string;
  age: string;
  treatments: TreatmentEntity[];
}

export interface TreatmentEntity {
  id: string;
  patientId: string;
  appointmentId: string;
  dise: string;
  treatment: string;
  note: string;
  createdAt: Date;
}

export interface CategoryEntity {
  id: string;
  categoryValue: string;
  categoryName: string;
}
export interface TimeslotEntity {
  id: string;
  timeSlotOrder: number;
  timeSlotValue: string;
}
export interface AppointmentEntity {
  id: string;
  appointmentId: number;
  patientId: string;
  doctorId: string;
  categoryId: string;
  timeSlotValue: string;
  appointmentDate: string;
  doctor: UserEntity;
}
