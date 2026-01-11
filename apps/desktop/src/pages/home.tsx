import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@synth-video/ui";
import { useLogger } from "@synth-video/application";

export function HomePage() {
  const logger = useLogger();

  const handleClick = () => {
    logger.info("Button clicked in desktop app");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="drag">
          <CardTitle className="text-2xl font-bold text-center">
            🖥️ Synth Video Desktop
          </CardTitle>
          <CardDescription className="text-center">
            Video synthesis platform - Desktop Application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 no-drag">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Welcome to Synth Video Desktop! This is the Electron renderer process.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="default" onClick={handleClick}>
              New Project
            </Button>
            <Button variant="outline">Open Project</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
