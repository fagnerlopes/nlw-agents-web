import { CreateRoomForm } from "@/components/create-room-form";
import { RoomList } from "@/components/room-list";

export function CreateRoom() {
  return (
    <div className="grid grid-cols-2 items-start gap-8">
      <CreateRoomForm />

      <RoomList />
    </div>
  );
}
