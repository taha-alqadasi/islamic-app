"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Pencil, Save, Trash2, X, Plus, Tag, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Note {
  id: string
  surahId: number
  surahName: string
  verseId: number
  title: string
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

interface QuranPersonalNotesProps {
  surahId?: number
  surahName?: string
  verseId?: number
  onClose: () => void
  nightMode: boolean
}

export default function QuranPersonalNotes({
  surahId,
  surahName,
  verseId,
  onClose,
  nightMode,
}: QuranPersonalNotesProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [activeTab, setActiveTab] = useState("current")
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    tags: [] as string[],
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [newTag, setNewTag] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null)
  const [activeTags, setActiveTags] = useState<string[]>([])

  // Load mock notes
  useEffect(() => {
    // Simulate loading notes from storage
    const mockNotes: Note[] = [
      {
        id: "1",
        surahId: 1,
        surahName: "الفاتحة",
        verseId: 5,
        title: "معنى الاستعانة",
        content:
          "الاستعانة هي طلب العون من الله تعالى في جميع الأمور. وهذا يدل على أن العبد لا يملك لنفسه نفعاً ولا ضراً إلا بمشيئة الله تعالى.",
        tags: ["تفسير", "عقيدة"],
        createdAt: "2023-12-01",
        updatedAt: "2023-12-01",
      },
      {
        id: "2",
        surahId: 2,
        surahName: "البقرة",
        verseId: 3,
        title: "الإيمان بالغيب",
        content:
          "الإيمان بالغيب هو الإيمان بما لا يدرك بالحواس الخمس، وهو أساس الإيمان وأول صفات المتقين. ويشمل الإيمان بالله وملائكته وكتبه ورسله واليوم الآخر والقدر خيره وشره.",
        tags: ["عقيدة", "إيمان"],
        createdAt: "2023-12-05",
        updatedAt: "2023-12-05",
      },
    ]

    setNotes(mockNotes)

    // If we have surah and verse info, set the active tab to "current"
    if (surahId && verseId) {
      setActiveTab("current")
    } else {
      setActiveTab("all")
    }
  }, [surahId, verseId])

  // Filter notes based on active tab and search query
  const filteredNotes = notes.filter((note) => {
    // Filter by tab
    if (activeTab === "current" && (note.surahId !== surahId || note.verseId !== verseId)) {
      return false
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query) ||
        note.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    return true
  })

  // Add a new note
  const addNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return

    const note: Note = {
      id: Date.now().toString(),
      surahId: surahId || 0,
      surahName: surahName || "",
      verseId: verseId || 0,
      title: newNote.title,
      content: newNote.content,
      tags: newNote.tags,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }

    setNotes([note, ...notes])
    setNewNote({ title: "", content: "", tags: [] })
    setIsEditing(false)
  }

  // Update an existing note
  const updateNote = () => {
    if (!editingNote) return

    const updatedNotes = notes.map((note) =>
      note.id === editingNote.id ? { ...editingNote, updatedAt: new Date().toISOString().split("T")[0] } : note,
    )

    setNotes(updatedNotes)
    setEditingNote(null)
  }

  // Delete a note
  const deleteNote = (id: string) => {
    setNoteToDelete(id)
    setDeleteDialogOpen(true)
  }

  // Add a tag to the current note
  const addTag = () => {
    if (!newTag.trim()) return

    if (editingNote) {
      setEditingNote({
        ...editingNote,
        tags: [...editingNote.tags, newTag],
      })
    } else {
      setNewNote({
        ...newNote,
        tags: [...newNote.tags, newTag],
      })
    }

    setNewTag("")
  }

  // Remove a tag from the current note
  const removeTag = (tag: string) => {
    if (editingNote) {
      setEditingNote({
        ...editingNote,
        tags: editingNote.tags.filter((t) => t !== tag),
      })
    } else {
      setNewNote({
        ...newNote,
        tags: newNote.tags.filter((t) => t !== tag),
      })
    }
  }

  return (
    <Card className={`w-full max-w-4xl ${nightMode ? "bg-gray-800 text-gray-100" : ""}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>ملاحظاتي</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              {surahId && verseId && <TabsTrigger value="current">الآية الحالية</TabsTrigger>}
              <TabsTrigger value="all">جميع الملاحظات</TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث في الملاحظات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-8 w-[200px] ${nightMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""}`}
                />
              </div>

              {!isEditing && !editingNote && (
                <Button onClick={() => setIsEditing(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة ملاحظة
                </Button>
              )}
            </div>
          </div>

          {/* New/Edit Note Form */}
          {(isEditing || editingNote) && (
            <Card className={`mb-4 p-4 ${nightMode ? "bg-gray-700" : "bg-gray-50"}`}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="note-title">العنوان</Label>
                  <Input
                    id="note-title"
                    value={editingNote ? editingNote.title : newNote.title}
                    onChange={(e) =>
                      editingNote
                        ? setEditingNote({ ...editingNote, title: e.target.value })
                        : setNewNote({ ...newNote, title: e.target.value })
                    }
                    placeholder="عنوان الملاحظة"
                    className={nightMode ? "bg-gray-600 text-gray-100 border-gray-500" : ""}
                  />
                </div>

                <div>
                  <Label htmlFor="note-content">المحتوى</Label>
                  <Textarea
                    id="note-content"
                    value={editingNote ? editingNote.content : newNote.content}
                    onChange={(e) =>
                      editingNote
                        ? setEditingNote({ ...editingNote, content: e.target.value })
                        : setNewNote({ ...newNote, content: e.target.value })
                    }
                    placeholder="اكتب ملاحظتك هنا..."
                    className={`min-h-[100px] ${nightMode ? "bg-gray-600 text-gray-100 border-gray-500" : ""}`}
                  />
                </div>

                <div>
                  <Label htmlFor="note-tags">الوسوم</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      id="note-tags"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="أضف وسماً"
                      className={nightMode ? "bg-gray-600 text-gray-100 border-gray-500" : ""}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addTag()
                        }
                      }}
                    />
                    <Button onClick={addTag} variant="outline" className="flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      إضافة
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(editingNote ? editingNote.tags : newNote.tags).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => removeTag(tag)}>
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false)
                      setEditingNote(null)
                      setNewNote({ title: "", content: "", tags: [] })
                    }}
                  >
                    إلغاء
                  </Button>
                  <Button onClick={editingNote ? updateNote : addNote}>
                    <Save className="h-4 w-4 mr-2" />
                    {editingNote ? "تحديث" : "حفظ"}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <TabsContent value="current" className="mt-4">
            {filteredNotes.length > 0 ? (
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {filteredNotes.map((note) => (
                    <Card key={note.id} className={nightMode ? "bg-gray-700" : ""}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{note.title}</CardTitle>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditingNote(note)}
                              className="h-8 w-8"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteNote(note.id)}
                              className="h-8 w-8 text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="whitespace-pre-line">{note.content}</p>
                        {note.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {note.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="pt-0">
                        <p className="text-xs text-muted-foreground">تم التحديث: {note.updatedAt}</p>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">لا توجد ملاحظات لهذه الآية</p>
                {!isEditing && (
                  <Button onClick={() => setIsEditing(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة ملاحظة
                  </Button>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="all" className="mt-4">
            {filteredNotes.length > 0 ? (
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {filteredNotes.map((note) => (
                    <Card key={note.id} className={nightMode ? "bg-gray-700" : ""}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{note.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {note.surahName} ({note.verseId})
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditingNote(note)}
                              className="h-8 w-8"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteNote(note.id)}
                              className="h-8 w-8 text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="whitespace-pre-line">{note.content}</p>
                        {note.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {note.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="pt-0">
                        <p className="text-xs text-muted-foreground">تم التحديث: {note.updatedAt}</p>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">لا توجد ملاحظات</p>
                {!isEditing && (
                  <Button onClick={() => setIsEditing(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة ملاحظة
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
        <AnimatePresence>
          {deleteDialogOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AlertDialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>حذف الملاحظة</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogDescription>
                    هل أنت متأكد من حذف هذه الملاحظة؟ هذه العملية لا يمكن التراجع عنها.
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>إلغاء</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        setNotes(notes.filter((note) => note.id !== noteToDelete))
                        setDeleteDialogOpen(false)
                        setNoteToDelete(null)
                      }}
                    >
                      حذف
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

