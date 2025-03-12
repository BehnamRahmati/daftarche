import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const goFullscreen = (): void => {
  const docElm = document.documentElement;

  if (docElm.requestFullscreen) {
    docElm.requestFullscreen();
  } else if ((docElm as any).webkitRequestFullscreen) {
    (docElm as any).webkitRequestFullscreen();
  } else if ((docElm as any).msRequestFullscreen) {
    (docElm as any).msRequestFullscreen();
  }
};

export const exitFullscreen = (): void => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if ((document as any).webkitExitFullscreen) {
    (document as any).webkitExitFullscreen();
  } else if ((document as any).msExitFullscreen) {
    (document as any).msExitFullscreen();
  }
};