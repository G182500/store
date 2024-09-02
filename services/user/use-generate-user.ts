import { useMutation } from "@tanstack/react-query";

export const useGenerateUser = () =>
  useMutation({
    mutationFn: async ({ user }: any) => {
      const resp = await fetch(`/api/user/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      return await resp.json();
    },
  });
