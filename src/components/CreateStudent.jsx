import { useForm } from "react-hook-form";
import { createStudent } from "../api/api";
import { useStore } from "../store/useStore";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";

export default function CreateStudent() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const { addStudent } = useStore();


  const onSubmit = async (data) => {
    const newStudent = {
      id: Date.now(),
      name: data.name.trim(),
      referralCode: "EDZ" + Math.floor(Math.random() * 90000 + 10000),
      createdAt: new Date().toISOString(),
    };
    try { await createStudent(newStudent); } catch {}
    addStudent(newStudent);
    toast.success(`${newStudent.name} added! 🎉`);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="create-student-form">
      <div className="form-group">
        <input
          {...register("name", { required: "Name is required", minLength: { value: 2, message: "Too short!" } })}
          placeholder="Enter student name..."
          className={`student-input ${errors.name ? "input-error" : ""}`}
        />
        {errors.name && <span className="error-msg">{errors.name.message}</span>}
      </div>
      <button type="submit" className="add-student-btn" disabled={isSubmitting}>
        <UserPlus size={16} />
        {isSubmitting ? "Adding..." : "Add Student"}
      </button>
    </form>
  );
}