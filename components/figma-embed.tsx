const FIGMA_FILE_KEY = "RIB8DZ9M5Uay7si4mI19Yt";

export function FigmaEmbed({ nodeId }: { nodeId: string }) {
  const figmaUrl = `https://www.figma.com/design/${FIGMA_FILE_KEY}/Venstra?node-id=${nodeId}`;
  const embedSrc = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(figmaUrl)}`;

  return (
    <iframe
      src={embedSrc}
      className="h-[400px] w-full rounded-2xl border-none"
      allowFullScreen
    />
  );
}
