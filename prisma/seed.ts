import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const usersData = [
    {
        name: 'Eray Aslan'
    },
    {
        name: 'Enes Faruk Meniz'
    },
    {
        name: 'Sefa Eren Şahin'
    },
    {
        name: 'Kadir Mutlu'
    }
];

const booksData = [
    {
        name: "The Hitchhiker's Guide to the Galaxy"
    },
    {
        name: "I, Robot"
    },
    {
        name: "Dune"
    }, 
    {
        name: "1984"
    },
    {
        name: "Brave New World"
    }
];

async function main() {
    await prisma.users.deleteMany()
    console.log('🚮 Deleted users')

    await prisma.books.deleteMany()
    console.log('🚮 Deleted books')

    console.log('🌱 Start seeding users...')

    for (const a of usersData) {
        const user = await prisma.users.create({
            data: a
        })
        console.log(`✅ Created user with id: ${user.id}`)
    }

    console.log('🌱 Start seeding books..')
    for (const u of booksData) {
        const book = await prisma.books.create({
            data: u
        })
        console.log(`✅ Created book with id: ${book.id}`)
    }
    console.log('🏁 Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })