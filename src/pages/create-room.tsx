import { CreateRoomForm } from "@/components/create-room-form";
import { RoomList } from "@/components/room-list";
import { useAuthStore } from "@/store/use-auth-store";

export function CreateRoom() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin";

  return (
    <div className={
      isAdmin
        ? "grid grid-cols-2 items-start gap-8"
        : "flex justify-center items-center min-h-[60vh]"
    }>
      {isAdmin && <CreateRoomForm />}

      <RoomList />
    </div>
  );
}
