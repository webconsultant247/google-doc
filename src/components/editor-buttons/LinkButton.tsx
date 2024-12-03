import { useEditorStore } from "@/store/use-editor-store";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Link2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState("");
  console.log(`Link: ${editor?.getAttributes("link").href}`);
  const onLinkChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };
  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) setValue(editor?.getAttributes("link").href || "");
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
        <Input
          className=""
          onChange={(e) => setValue(e.target.value)}
          placeholder="https://example.com"
          value={value}
        />
        <Button onClick={() => onLinkChange(value)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FontFamilyButton;
