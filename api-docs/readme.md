### Ressursid
```mermaid
erDiagram
    scheduled ||--o{scheduled_has_courses:id
    scheduled ||--o{scheduled_has_lecturers:id
    scheduled ||--o{scheduled_has_rooms:id
   scheduled
   scheduled {
        id number
        startTime datetime
        endTime datetime
        comment string
        subjects_id number
        distanceLink string
        dateCreated datetime
        dateUpdated datetime
        dateDeleted datetime
    }
    courses ||--o{scheduled_has_courses:courses_id
    courses
    courses {
        id number
        course string
        courseLong string
        dateCreated datetime
        dateUpdated datetime
        dateDeleted datetime

    }
    homeworks
    homeworks
    homeworks {
        id number
        description string
        dueDate datetime
        subjects_id number
        dateCreated datetime
        dateUpdated datetime
        dateDeleted datetime
        
    }
    lecturers ||--o{scheduled_has_lecturers:lecturers_id
    lecturers
    lecturers {
        id number
        firstName string
        lastName string
        email string
        dateCreated datetime
        dateUpdated datetime
        dateDeleted datetime
        }
    rooms ||--o{scheduled_has_rooms:rooms_id
    rooms{
        id number
        room string
        dateCreated datetime
        dateUpdated datetime
        dateDeleted datetime
        }
    subjects ||--o{homeworks:subjects_id
    subjects ||--o{scheduled:subjects_id
    subjects
    subjects{
        id number
        subject string
        subjectCode string
        creditPoint number
        dateCreated datetime
        dateUpdated datetime
        dateDeleted datetime
        }  
    scheduled_has_courses
    scheduled_has_courses{
        id number
        scheduled_id
        courses_id
        }
    scheduled_has_rooms
    scheduled_has_rooms{
        id number
        scheduled_id
        rooms_id
        }
    scheduled_has_lecturers
    scheduled_has_lecturers{
        id number
        schedule_id
        lecturers_id
        }
        





```

### Endpoindid

### API t????tamise kontrollimiseks
- `GET /api/ping`

### Tunniplaaniga seotud
- [Tunniplaani p??ring p??rimine](./endpoints/users/get.md#list-of-users): `GET /api/schedule`
- [Tunniplaani p??ring p??rimine alates kuup??evast](./endpoints/users/get.md#user-by-id): `GET /api/schedule/:atDate`
- [Tunniplaani p??ring p??rimine alates kuup??evast kuni kuup??evani](./endpoints/users/get.md#user-by-id): `GET /api/schedule/:atDate/:toDate`
- Uue loengu aja lisamine: `POST /api/schedule/`
- Loengu aja muutmine: `PATCH /api/schedule/:id`
- Loengu aja kustutamine: `DELETE /api/v1/users/:id/`

### ??ppej??uga seotud


### ??ppeainega seotud


### Kursusega seotud


### Ruumiga seotud

### Kodut????ga seotud
- K??ik kodut????d: `GET /api/homeworks/`
- Kodut???? id j??rgi: `GET /api/homeworks/:id`
- Kodut???? lisamine: `POST /api/homeworks/`
- Kodut???? muutmine: `PATCH /api/homeworks/:id`
- Kodut???? kustutamine: `DELETE /api/homeworks/:id`
- Kodut???? leidmine ??ppeaine koodi ja t??htaja j??rgi: `GET /api/homeworkbycode/:code/:atDate`






