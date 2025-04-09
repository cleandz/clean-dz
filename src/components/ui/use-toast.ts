
// This file should re-export functionality from the hooks file
import { useToast as useHookToast, toast as hookToast } from "@/hooks/use-toast";

export const useToast = useHookToast;
export const toast = hookToast;
