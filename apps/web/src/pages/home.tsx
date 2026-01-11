import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@synth-video/ui";

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            🎬 Synth Video
          </CardTitle>
          <CardDescription className="text-center">
            Video synthesis platform - Web Application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Welcome to Synth Video! This is the web application running in the browser.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="default">Get Started</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
