import axiosInstance from '@utils/httpCommons'

import {
  Character,
  CharacterCoord,
  CharacterGraph,
  CharacterRelationship,
} from '@types'

// GET /api/casting/{castingId}
export const getCharacter = async (castingId: string): Promise<Character> => {
  try {
    const response = await axiosInstance.get<Character>(`/casting/${castingId}`)
    return response.data
  } catch (error) {
    console.error('Failed to get character:', error)
    throw error
  }
}

// PUT /api/casting/{castingId}
export const putCharacter = async (data: Character): Promise<Character> => {
  try {
    console.log(data)
    const response = await axiosInstance.put<Character>(
      `/casting/${data.id}`,
      data,
    )
    return response.data
  } catch (error) {
    console.error('Failed to update character:', error)
    throw error
  }
}

// DELETE /api/casting/{castingId}
export const deleteCharacter = async (castingId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/casting/${castingId}`)
  } catch (error) {
    console.error('Failed to delete character:', error)
    throw error
  }
}

// PUT /api/casting/{castingId}/coord
export const putCharacterCoord = async (
  castingId: string,
  data: CharacterCoord,
): Promise<Character> => {
  try {
    const response = await axiosInstance.put<Character>(
      `/casting/${castingId}/coord`,
      data,
    )
    return response.data
  } catch (error) {
    console.error('Failed to update character coord:', error)
    throw error
  }
}

// PUT /api/casting/relationship/{uuid}
export const putCharacterRelationship = async (
  uuid: string,
  data: CharacterRelationship,
): Promise<CharacterRelationship> => {
  try {
    const response = await axiosInstance.put<CharacterRelationship>(
      `/casting/relationship/${uuid}`,
      data,
    )
    return response.data
  } catch (error) {
    console.error('Failed to update character relationship:', error)
    throw error
  }
}

// DELETE /api/casting/relationship/{uuid}
export const deleteCharacterRelationship = async (
  uuid: string,
): Promise<void> => {
  try {
    await axiosInstance.delete(`/casting/relationship/${uuid}`)
  } catch (error) {
    console.error('Failed to delete character relationship:', error)
    throw error
  }
}

// GET /api/casting
export const getCharacters = async (folderId: string): Promise<Character[]> => {
  try {
    const response = await axiosInstance.get<Character[]>(
      `/casting?folderId=${folderId}`,
    )
    return response.data
  } catch (error) {
    console.error('Failed to get characters:', error)
    throw error
  }
}

export const postCharacter = async (
  character: Partial<Character>,
): Promise<Character> => {
  const response = await axiosInstance.post<Character>('/casting', character)
  return response.data
}

// POST /api/casting/relationship
export const postCharacterRelationship = async (
  data: CharacterRelationship,
): Promise<CharacterRelationship> => {
  try {
    const response = await axiosInstance.post<CharacterRelationship>(
      '/casting/relationship',
      data,
    )
    return response.data
  } catch (error) {
    console.error('Failed to create character relationship:', error)
    throw error
  }
}

// POST /api/casting/image
export const uploadCharacterImage = async (
  data: Partial<Character>,
): Promise<string> => {
  try {
    const response = await axiosInstance.post<string>('/casting/image', data)
    return response.data
  } catch (error) {
    console.error('Failed to upload character image:', error)
    throw error
  }
}

// GET /api/casting/graph
export const getCharacterGraph = async (
  projectId: number,
): Promise<CharacterGraph> => {
  try {
    const response = await axiosInstance.get<CharacterGraph>(
      `/casting/graph?projectId=${projectId}`,
    )
    return response.data
  } catch (error) {
    console.error('Failed to get character graph:', error)
    throw error
  }
}
