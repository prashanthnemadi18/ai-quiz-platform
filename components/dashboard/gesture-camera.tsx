'use client';

import { interpretUserGestures } from '@/ai/flows/interpret-user-gestures';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Camera, CameraOff, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Progress } from '@/components/ui/progress';

export function GestureCamera() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [gesture, setGesture] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  const startCamera = async () => {
    setError(null);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraOn(true);
      } catch (err) {
        console.error('Error accessing camera:', err);
        const errorMessage =
          'Could not access camera. Please check permissions.';
        setError(errorMessage);
        toast({
          variant: 'destructive',
          title: 'Camera Error',
          description: errorMessage,
        });
      }
    } else {
      const errorMessage = 'Your browser does not support camera access.';
      setError(errorMessage);
      toast({
        variant: 'destructive',
        title: 'Unsupported Browser',
        description: errorMessage,
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  };

  const toggleCamera = () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const captureAndRecognize = async () => {
    if (!videoRef.current) return;
    setIsLoading(true);
    setGesture(null);
    setConfidence(null);
    setError(null);

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    context?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUri = canvas.toDataURL('image/jpeg');

    try {
      const result = await interpretUserGestures({ photoDataUri: dataUri });
      if (result && result.gesture) {
        setGesture(result.gesture);
        setConfidence(result.confidence);
      } else {
        throw new Error('Invalid response from AI');
      }
    } catch (err) {
      console.error('Error interpreting gesture:', err);
      toast({
        variant: 'destructive',
        title: 'Recognition Failed',
        description: 'Could not interpret the gesture. Please try again.',
      });
      setError('Could not interpret the gesture. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-lg border bg-muted aspect-video">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="h-full w-full object-cover"
        />
        {!isCameraOn && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <CameraOff className="h-12 w-12" />
            <p>Camera is off</p>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button onClick={toggleCamera} variant="outline" size="lg">
          {isCameraOn ? <CameraOff /> : <Camera />}
          <span>{isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}</span>
        </Button>
        <Button
          onClick={captureAndRecognize}
          disabled={!isCameraOn || isLoading}
          size="lg"
        >
          {isLoading && <Loader2 className="animate-spin" />}
          <span>Recognize Gesture</span>
        </Button>
      </div>

      {(gesture || isLoading || error) && (
        <div className="mx-auto max-w-md rounded-lg border p-4 text-center">
          {isLoading && (
            <p className="text-muted-foreground">Analyzing gesture...</p>
          )}
          {error && <p className="text-destructive">{error}</p>}
          {gesture && confidence !== null && (
            <div className="space-y-2">
              <p className="text-lg">Detected Gesture:</p>
              <p className="font-headline text-4xl font-bold capitalize text-primary">
                {gesture}
              </p>
              <div className="space-y-1 pt-2">
                <p className="text-sm text-muted-foreground">Confidence</p>
                <Progress value={confidence * 100} className="w-full" />
                <p className="text-sm font-medium">
                  {(confidence * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
