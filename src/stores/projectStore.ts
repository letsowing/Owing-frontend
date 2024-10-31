import { Project } from '@types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const DEFAULT_PROJECT: Project = {
  id: 0,
  title: '',
  genres: [],
  imageUrl: '',
  category: '',
  description: '',
}

interface ProjectStoreState {
  projects: Project[]
  currentProject: Project
  selectedFolderId: number
  selectedFileId: number
}

interface ProjectStoreActions {
  setCurrentProject: (project: Project) => void
  updateProject: (project: Project) => void
  addProject: (project: Project) => void
  deleteProject: (id: number) => void
  setSelectedFolderId: (id: number) => void
  setSelectedFileId: (id: number) => void
}

type ProjectStore = ProjectStoreState & ProjectStoreActions

const createProjectCopy = (project: Project): Project => ({
  ...project,
  genres: [...project.genres],
  // optional 필드들에 대한 조건부 복사
  createdAt: project.createdAt ? new Date(project.createdAt) : undefined,
  updatedAt: project.updatedAt ? new Date(project.updatedAt) : undefined,
})

export const useProjectStore = create(
  persist<ProjectStore>(
    (set) => ({
      projects: [],
      currentProject: DEFAULT_PROJECT,
      selectedFolderId: 0,
      selectedFileId: 0,

      setCurrentProject: (project) =>
        set({
          currentProject: createProjectCopy(project),
        }),

      updateProject: (updatedProject) =>
        set((state) => {
          const newProject = createProjectCopy(updatedProject)
          return {
            projects: state.projects.map((p) =>
              p.id === updatedProject.id ? newProject : p,
            ),
            currentProject:
              state.currentProject.id === updatedProject.id
                ? newProject
                : state.currentProject,
          }
        }),

      addProject: (newProject) =>
        set((state) => ({
          projects: [...state.projects, createProjectCopy(newProject)],
        })),

      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          currentProject:
            state.currentProject.id === id
              ? DEFAULT_PROJECT
              : state.currentProject,
        })),

      setSelectedFolderId: (id) => set({ selectedFolderId: id }),

      setSelectedFileId: (id) => set({ selectedFileId: id }),
    }),
    {
      name: 'project-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
