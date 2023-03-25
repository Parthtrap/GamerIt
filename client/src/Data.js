export const note = [
    {
        _id: 1,
        title: "Note 1",
        description: "This is a note",
        Date: "March 28, 2020",
    },
    {
        _id: 2,
        title: "Note 2 Note 2 Note 2Note 2Note 2 Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2Note 2",
        description: "This is a note",
        Date: "March 28, 2020",
    },
    {
        _id: 3,
        title: "Note 1",
        description: "This is a note",
        Date: "March 28, 2020",
    },
    {
        _id: 4,
        title: "Note 1",
        description: "This is a note",
        Date: "March 28, 2020",
    },
    
];


// const postSchema = new mongoose.Schema({
// 	userId: { type: String, required: true },
// 	title: { type: String, required: true },
// 	content: { type: String, required: true },
// 	imgSrc: String,
// 	likeUsers: [String],
// 	community: String,
// 	tags: [tagSchema],
// 	comments: [commentSchema],
// 	reports: [reportSchema],
// 	createdAt: Date,
// });


//create a object which calls this postSchema
export const postSchema =[
    {
        userId: "gaurav",
        title: "{ type: String, required: true }",
        content: "{ type: String, required: true }",
        imgSrc: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsimple.wikipedia.org%2Fwiki%2FLink&psig=AOvVaw0jo6LPQO8oa5j6BjKgwGiA&ust=1679767113865000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNCokaqS9f0CFQAAAAAdAAAAABAH",
        likeUsers: ["PictureInPictureEvent","raju"],
        community: "String",
        tags: [
            {
                name: "String",
                color: "String"
            },
            {
                name: "sdsd",
                color: "Strsddsing"
            }
        ],
        comments: [
            {
                userId: "gaurav",
                text: "String",
                likes: ["PictureInPictureEvent","raju"],
                isDeleted: false,
                createdAt: "Date",
                replies: [
                    {
                        userId: "dddd",
                        text: "String",
                        likes: ["PictureInPictureEvent","raju"],
                        isDeleted: false,
                        createdAt: "Date",
                        replies: []
                    }
                ]
            }
        ],
        reports: [
            {
                userId: "gaurav",
                reason: "String",
                createdAt: "Date"
            }
        ],
        createdAt: "Date"
    },
    {
        userId: "gaurav",
        title: "{ type: String, required: true }",
        content: "{ type: String, required: true }",
        imgSrc: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsimple.wikipedia.org%2Fwiki%2FLink&psig=AOvVaw0jo6LPQO8oa5j6BjKgwGiA&ust=1679767113865000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNCokaqS9f0CFQAAAAAdAAAAABAH",
        likeUsers: ["PictureInPictureEvent","raju"],
        community: "String",
        tags: [
            {
                name: "String",
                color: "String"
            },
            {
                name: "sdsd",
                color: "Strsddsing"
            }
        ],
        comments: [
            {
                userId: "gaurav",
                text: "String",
                likes: ["PictureInPictureEvent","raju"],
                isDeleted: false,
                createdAt: "Date",
                replies: [
                    {
                        userId: "dddd",
                        text: "String",
                        likes: ["PictureInPictureEvent","raju"],
                        isDeleted: false,
                        createdAt: "Date",
                        replies: []
                    }
                ]
            }
        ],
        reports: [
            {
                userId: "gaurav",
                reason: "String",
                createdAt: "Date"
            }
        ],
        createdAt: "Date"
    },
    {
        userId: "gaurav",
        title: "{ type: String, required: true }",
        content: "{ type: String, required: true }",
        imgSrc: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsimple.wikipedia.org%2Fwiki%2FLink&psig=AOvVaw0jo6LPQO8oa5j6BjKgwGiA&ust=1679767113865000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNCokaqS9f0CFQAAAAAdAAAAABAH",
        likeUsers: ["PictureInPictureEvent","raju"],
        community: "String",
        tags: [
            {
                name: "String",
                color: "String"
            },
            {
                name: "sdsd",
                color: "Strsddsing"
            }
        ],
        comments: [
            {
                userId: "gaurav",
                text: "String",
                likes: ["PictureInPictureEvent","raju"],
                isDeleted: false,
                createdAt: "Date",
                replies: [
                    {
                        userId: "dddd",
                        text: "String",
                        likes: ["PictureInPictureEvent","raju"],
                        isDeleted: false,
                        createdAt: "Date",
                        replies: []
                    }
                ]
            }
        ],
        reports: [
            {
                userId: "gaurav",
                reason: "String",
                createdAt: "Date"
            }
        ],
        createdAt: "Date"
    }
]