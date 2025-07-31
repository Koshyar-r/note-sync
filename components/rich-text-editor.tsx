"use client"

import { useEditor, EditorContent, useEditorState, type JSONContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Document from "@tiptap/extension-document"
import Paragraph from "@tiptap/extension-paragraph"
import Text from "@tiptap/extension-text"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Superscript from "@tiptap/extension-superscript"
import Subscript from "@tiptap/extension-subscript"
import TextAlign from "@tiptap/extension-text-align"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Undo,
  Redo,
  Bold,
  Italic,
  Strikethrough,
  Code,
  UnderlineIcon,
  LinkIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Plus,
  ChevronDown,
  SuperscriptIcon,
  SubscriptIcon,
} from "lucide-react"
import { updateNote } from "@/server/notes"
import { useCallback } from "react"
import ListItem from "@tiptap/extension-list-item"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"

interface RichTextEditorProps {
  content?: JSONContent[]
  noteId?: string
}

const RichTextEditor = ({ content, noteId }: RichTextEditorProps) => {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable the built-in list extensions since we're configuring them separately
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Document,
      Paragraph,
      Text,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline cursor-pointer",
        },
      }),
      Superscript,
      Subscript,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal",
        },
      }),
      ListItem,
    ],
    immediatelyRender: false,
    autofocus: true,
    editable: true,
    injectCSS: false,
    onUpdate: ({ editor }) => {
      if (noteId) {
        const content = editor.getJSON()
        updateNote(noteId, { content })
      }
    },
    content: content ?? {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Getting started" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Welcome to the " },
            {
              type: "text",
              text: "Simple Editor",
              marks: [{ type: "italic" }],
            },
            { type: "text", text: " template! This template integrates " },
            { type: "text", text: "open source", marks: [{ type: "bold" }] },
            {
              type: "text",
              text: " UI components and Tiptap extensions licensed under ",
            },
            { type: "text", text: "MIT", marks: [{ type: "bold" }] },
            { type: "text", text: "." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Integrate it by following the " },
            {
              type: "text",
              text: "Tiptap UI Components docs",
              marks: [{ type: "code" }],
            },
            { type: "text", text: " or using our CLI tool." },
          ],
        },
        {
          type: "codeBlock",
          content: [{ type: "text", text: "npx @tiptap/cli init" }],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Features" }],
        },
        {
          type: "blockquote",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "A fully responsive rich text editor with built-in support for common formatting and layout tools. Type markdown ",
                },
                { type: "text", text: "**", marks: [{ type: "bold" }] },
                { type: "text", text: " or use keyboard shortcuts " },
                { type: "text", text: "⌘+B", marks: [{ type: "code" }] },
                { type: "text", text: " for most all common markdown marks." },
              ],
            },
          ],
        },
      ],
    },
  })

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx.editor) return {}
      return {
        isBold: ctx.editor?.isActive("bold"),
        canBold: ctx.editor?.can().chain().focus().toggleBold().run(),
        isItalic: ctx.editor?.isActive("italic"),
        canItalic: ctx.editor?.can().chain().focus().toggleItalic().run(),
        isStrike: ctx.editor?.isActive("strike"),
        canStrike: ctx.editor?.can().chain().focus().toggleStrike().run(),
        isCode: ctx.editor?.isActive("code"),
        canCode: ctx.editor?.can().chain().focus().toggleCode().run(),
        isUnderline: ctx.editor?.isActive("underline"),
        canUnderline: ctx.editor?.can().chain().focus().toggleUnderline().run(),
        isLink: ctx.editor?.isActive("link"),
        isSuperscript: ctx.editor?.isActive("superscript"),
        isSubscript: ctx.editor?.isActive("subscript"),
        isParagraph: ctx.editor?.isActive("paragraph"),
        isHeading1: ctx.editor?.isActive("heading", { level: 1 }),
        isHeading2: ctx.editor?.isActive("heading", { level: 2 }),
        isHeading3: ctx.editor?.isActive("heading", { level: 3 }),
        isBulletList: ctx.editor?.isActive("bulletList"),
        isOrderedList: ctx.editor?.isActive("orderedList"),
        isCodeBlock: ctx.editor?.isActive("codeBlock"),
        isBlockquote: ctx.editor?.isActive("blockquote"),
        isAlignLeft: ctx.editor?.isActive({ textAlign: "left" }),
        isAlignCenter: ctx.editor?.isActive({ textAlign: "center" }),
        isAlignRight: ctx.editor?.isActive({ textAlign: "right" }),
        isAlignJustify: ctx.editor?.isActive({ textAlign: "justify" }),
        canUndo: ctx.editor?.can().chain().focus().undo().run(),
        canRedo: ctx.editor?.can().chain().focus().redo().run(),
      }
    },
  })

  const getActiveHeading = () => {
    if (editorState?.isHeading1) return "H1"
    if (editorState?.isHeading2) return "H2"
    if (editorState?.isHeading3) return "H3"
    return "H1"
  }

  const toggleLink = useCallback(() => {
    if (editorState?.isLink) {
      editor?.chain().focus().unsetLink().run()
    } else {
      const url = window.prompt("Enter URL:")
      if (url) {
        editor?.chain().focus().setLink({ href: url }).run()
      }
    }
  }, [editor, editorState?.isLink])

  const insertContent = useCallback(() => {
    // Simple content insertion - you can expand this with a dropdown menu
    editor?.chain().focus().insertContent("<p>New paragraph</p>").run()
  }, [editor])

  return (
    <div className="w-full max-w-7xl bg-card text-card-foreground rounded-lg overflow-hidden border">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 bg-muted/50 border-b">
        {/* Undo/Redo */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editorState?.canUndo}
          className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editorState?.canRedo}
          className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <Redo className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />

        {/* Heading Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-accent gap-1"
            >
              {getActiveHeading()}
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-popover border">
            <DropdownMenuItem
              onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
              className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Heading 1
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
              className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Heading 2
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
              className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Heading 3
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor?.chain().focus().setParagraph().run()}
              className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Paragraph
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Lists */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.isBulletList
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.isOrderedList
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />

        {/* Text Formatting */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editorState?.canBold}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.isBold ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editorState?.canItalic}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.isItalic ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          disabled={!editorState?.canStrike}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.isStrike ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleCode().run()}
          disabled={!editorState?.canCode}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.isCode ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          disabled={!editorState?.canUnderline}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.isUnderline
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />

        {/* Additional Tools */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLink}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.isLink ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleSuperscript().run()}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.isSuperscript
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <SuperscriptIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleSubscript().run()}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.isSubscript
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <SubscriptIcon className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />

        {/* Alignment */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.isAlignLeft
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.isAlignCenter
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.isAlignRight
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().setTextAlign("justify").run()}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.isAlignJustify
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <AlignJustify className="h-4 w-4" />
        </Button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Add Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={insertContent}
          className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-accent gap-1"
        >
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      {/* Editor Content */}
      <div className="min-h-96 p-6 bg-card">
        <EditorContent
          editor={editor}
          className="prose prose-neutral dark:prose-invert max-w-none focus:outline-none [&_.ProseMirror]:focus:outline-none [&_.ProseMirror]:min-h-96 [&_.ProseMirror_h1]:text-3xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:mb-4 [&_.ProseMirror_h2]:text-2xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:mb-3 [&_.ProseMirror_p]:mb-4 [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-border [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_pre]:bg-muted [&_.ProseMirror_pre]:p-4 [&_.ProseMirror_pre]:rounded [&_.ProseMirror_pre]:overflow-x-auto [&_.ProseMirror_code]:bg-muted [&_.ProseMirror_code]:px-1 [&_.ProseMirror_code]:rounded [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6 [&_.ProseMirror_li]:mb-1"
        />
      </div>
    </div>
  )
}

export default RichTextEditor