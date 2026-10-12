// Keeps every page free of repeated photos.
//
// Several files in /public/images are near-identical copies of another photo
// (e.g. students-classroom-fun.jpeg and students-classroom-fun-2.jpeg), so they
// are treated as the same picture.

/** Distinct school photos, roughly from most to least versatile. */
export const PHOTO_POOL = [
  '/images/students-large-group-photo.jpeg',
  '/images/students-montessori-classroom.jpeg',
  '/images/students-cultural-day.jpeg',
  '/images/students-classroom-fun.jpeg',
  '/images/students-classroom-primary.jpeg',
  '/images/students-uniform-outdoor-group.jpeg',
  '/images/students-smiling-closeup.jpeg',
  '/images/students-teacher-outdoor.jpeg',
  '/images/students-group-celebration.jpeg',
  '/images/students-outdoor-play-1.jpeg',
  '/images/students-outdoor-play-2.jpeg',
  '/images/students-playground-trampoline.jpeg',
  '/images/students-uniform-badges.jpeg',
  '/images/teacher-student-mentorship.jpeg',
  '/images/students-bench-outdoor.jpeg',
  '/images/students-field-trip-bench.jpeg',
  '/images/student-field-trip-bench-2.jpeg',
  '/images/student-field-trip-tree.jpeg',
  '/images/student-uniform-portrait.jpeg',
  '/images/students-preschool-standing.jpeg',
  '/images/students-preschool-twins.jpeg',
  '/images/students-preschool-cubbies.jpeg',
  '/images/students-preschool-lunch-closeup.jpeg',
  '/images/students-preschool-lunch-group.jpeg',
  '/images/students-school-building-front.jpeg',
  '/images/school-building.jpeg',
  '/images/students-group-pavilion.jpeg',
]

/** Same key for a photo and its near-identical "-2" copy, wherever it is hosted. */
export function photoKey(src: string) {
  const file = src.split('?')[0].split('/').pop() || src
  return file.toLowerCase().replace(/-2(\.[a-z]+)$/, '$1')
}

export class PhotoPicker {
  private used = new Set<string>()

  has(src: string) {
    return this.used.has(photoKey(src))
  }

  /** Marks a photo as used. Returns false when it was already on the page. */
  claim(src: string) {
    const key = photoKey(src)
    if (this.used.has(key)) return false
    this.used.add(key)
    return true
  }

  /** Keeps the items whose photo is not on the page yet, and claims them. */
  unique<T>(items: T[], getSrc: (item: T) => string) {
    return items.filter((item) => this.claim(getSrc(item)))
  }

  /** First unused photo from the preferred list, then from the pool. */
  pick(preferred: string[] = []) {
    const choice = [...preferred, ...PHOTO_POOL].find((src) => !this.has(src)) ?? preferred[0] ?? PHOTO_POOL[0]
    this.claim(choice)
    return choice
  }

  pickMany(preferred: string[], count: number) {
    return Array.from({ length: count }, () => this.pick(preferred))
  }
}
