import { SceneController } from "@/components/scene/SceneController";
import { DemoStateProvider } from "@/lib/demo-state";

export default function Home() {
  return (
    <DemoStateProvider>
      <SceneController />
    </DemoStateProvider>
  );
}
