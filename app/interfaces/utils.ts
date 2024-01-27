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
  treatments: TreatmentEntity[];
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
