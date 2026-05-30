export default defineAppConfig({
  ui: {
    primary: "amber",
    gray: "zinc",
    modal: {
      width: "sm:max-w-2xl lg:max-w-4xl",
      overlay: { background: "bg-gray-950/80 backdrop-blur-sm" },
      background: "bg-gray-950",
    },
    select: {
      base: "font-quicksand text-sm",
      color: {
        white: {
          outline:
            "bg-gray-900 border border-gray-800 text-gray-200 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30",
        },
      },
      variant: {
        outline:
          "bg-gray-900 border border-gray-800 text-gray-200 focus:border-amber-500/60",
      },
    },
    card: {
      background: "bg-gray-950",
      divide: "divide-gray-800",
      ring: "ring-0",
      shadow: "shadow-none",
    },
  },
});
