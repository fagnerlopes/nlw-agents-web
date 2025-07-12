import { CreateRoomForm } from "@/components/create-room-form";
import { Header } from "@/components/header";
import { RoomList } from "@/components/room-list";

export function CreateRoom() {
  return (
    <div className="bg-background text-foreground min-h-screen px-4 py-8">
      <Header />
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 items-start gap-8">
          <CreateRoomForm />

          <RoomList />
        </div>
      </div>
    </div>
  );
}
