import { toast } from "sonner"

export function useToast() {
  function showSuccessToast(message: string, description?: string) {
    toast.success(message, {
      description,
      position:"top-right",
    })
  }

  function showErrorToast(message: string, description?: string) {
    toast.error(message, {
      description,
      position:"top-right",
    })
  }

  function showInfoToast(message: string, description?: string) {
    toast(message, {
      description,
      position:"top-right",
    })
  }

  function showActionToast(
    message: string,
    description: string,
    actionLabel: string,
    onClick: () => void
  ) {
    toast(message, {
      description,

      action: {
        label: actionLabel,
        onClick,
      },
    })
  }

  return {
    showSuccessToast,
    showErrorToast,
    showInfoToast,
    showActionToast,
  }
}
