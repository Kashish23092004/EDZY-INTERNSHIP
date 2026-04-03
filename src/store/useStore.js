import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      snacks: [],
      students: [],
      orders: [],
      setSnacks: (data) => set({ snacks: data }),
      setStudents: (data) => set({ students: data }),
      setOrders: (data) => set({ orders: data }),
      addStudent: (student) =>
        set((state) => ({ students: [...state.students, student] })),
      addOrder: (order) =>
        set((state) => ({ orders: [...state.orders, order] })),
      getStudentOrders: (studentId) =>
        get().orders.filter((o) => String(o.studentId) === String(studentId)),
      getStudentTotal: (studentId) =>
        get().orders
          .filter((o) => String(o.studentId) === String(studentId))
          .reduce((sum, o) => sum + o.total, 0),
    }),
    { name: "canteen-storage" }
  )
);