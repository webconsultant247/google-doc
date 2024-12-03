"use client";
import FontFamilyButton from "@/components/editor-buttons/FontFamilyButton";
import HeadingLevelButton from "@/components/editor-buttons/HeadingLevelButton";
import HighlightColorButton from "@/components/editor-buttons/HighlightColorButton";
import TextColorButton from "@/components/editor-buttons/TextColorButton";
import LinkButton from "@/components/editor-buttons/LinkButton";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import {
  BoldIcon,
  LucideIcon,
  Printer,
  Redo2Icon,
  SpellCheckIcon,
  Undo2Icon,
  ItalicIcon,
  UnderlineIcon,
  MessageSquarePlusIcon,
  ListTodoIcon,
  RemoveFormattingIcon,
} from "lucide-react";
import React from "react";
import ImageButton from "@/components/editor-buttons/ImageButton";
import AlignmentButton from "@/components/editor-buttons/AlignmentButton";
import ListButton from "@/components/editor-buttons/ListButton";

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={() => onClick && onClick()}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

const Toolbar = () => {
  const { editor } = useEditorStore();
  console.log(`Toolbar editor: ${editor}`);
  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().run(),
      },
      {
        label: "Print",
        icon: Printer,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => console.log("TODO: comment"),
        isActive: false, //Todo: later
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];
  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item) => (
        <ToolbarButton
          key={item.label}
          onClick={item.onClick}
          icon={item.icon}
        />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: FONT FAMILY */}
      <FontFamilyButton />

      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: HEADING */}
      <HeadingLevelButton />

      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: SIZE */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      {/* TODO: TEXT COLOR */}
      <TextColorButton />

      {/* TODO: HIGHLIGHT COLOR */}
      <HighlightColorButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* {TODO: LINK */}
      <LinkButton />
      {/* {TODO: IMAGE */}
      <ImageButton />
      {/* {TODO: ALIGN */}
      <AlignmentButton />
      {/* {TODO: LINE HEIGHT */}
      <ListButton />
      {/* {TODO: LIST */}
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};

export default Toolbar;
