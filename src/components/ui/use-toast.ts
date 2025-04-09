
import { useToast as useHookToast } from "@/hooks/use-toast";
import { toast as hookToast } from "@/hooks/use-toast";

// Re-export useToast hook with the same functionality
export const useToast = useHookToast;

// Re-export toast with the same functionality
export const toast = hookToast;
