export interface UserEntity {
  id: string;
  userId: string;
  password: string;
  userName: string;
  address: string;
  phone: string;
  email: string;
  type: string;
}

export interface TreatmentEntity {
  id: string;
  userId: string;
  userName: string;
  dise: string;
  treatment: string;
  note: string;
  createdAt: Date;
}
