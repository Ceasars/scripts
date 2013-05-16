//Count the number of new books
print('**********--BookView Checks--*********');
print('**************************************');
var old_count = db.bookViews.find().count(); var new_count = db.bookViews_newOne.find().count();
print('> Expected an increase in number of bookViews max to 5%.');
print('- New added book number in views: '+(new_count-old_count)+' out of total:'+db.bookViews_newOne.find().count());
print();

//Count the number of books without title
var count = db.bookViews_newOne.find({'descriptive.title':''}).count();
print('> Expected only less then 10 books without title.');
print('- Books without title: '+count);
print();

//Count the number of books without contributor in them
var count = db.bookViews_newOne.find({'meta.contributors':{$size:0}}).count();
print('> Expected around 3.3k books without contributor.');
print('- Books without contributor: '+count);
print();
//Count the number of books with empty named contributors in them
var count = db.bookViews_newOne.find({"meta.contributors.displayName" : {$in:[' ',', ','',' ']}}).count()
print('> Expected around 9.6k books with none complete displayName. ');
print('- Books without complete displayName: '+count);
print();

//Count the number of books famous author has 
var cursor = db.bookViews_newOne.find({'bookId':'25687c7c-2483-40c3-9a15-2aae0c1ec419'},{'meta.contributors.booksCount':1,_id:0});
var count = cursor[0].meta.contributors[0].booksCount;
print('> Expected Stephen King books around 239.');
print('- Books from Stephen King: '+count);
print();
var cursor = db.bookViews_newOne.find({'bookId':'c57aa9e1-f4b1-012f-5363-055e0b4caaf7'},{'meta.contributors.booksCount':1,_id:0});
var count = cursor[0].meta.contributors[0].booksCount;
print('> Expected J. K. Rowling books around 28.');
print('- Books from J. K. Rowling: '+count);
print();
var criticalReviews = 0; var user_reviews = 0;
var user_reviews_new = 0; var criticalReviews_new=0;
db.bookViews.find({},{user:1,_id:0}).forEach(
	function (x){
	if (x.user){
		if (x.user.userReviews.length > 0){
			user_reviews++;
		};
		if (x.user.criticalReviews.length > 0){
			criticalReviews++;
		};
	}
	}
);
db.bookViews_newOne.find({},{user:1,_id:0}).forEach(
	function (x){
	if (x.user){
		if (x.user.userReviews.length > 0){
			user_reviews_new++;
		};
		if (x.user.criticalReviews.length > 0){
			criticalReviews_new++;
		};
	}
	}
);
print('> Expected Bookviews with userReviews: '+user_reviews);
print('- BookViews with userReviews: '+user_reviews_new);
print();

print('> Expected Bookviews with criticalReviews: '+criticalReviews);
print('- BookViews with criticalReviews: '+criticalReviews_new);
print();


print('*********************************************');
print();
print('**********--ContributorView Checks--*********');
print('*********************************************');
var old_count = db.contributorViews.find().count(); var new_count = db.contributorViews_newOne.find().count();
print('> Expected an increase in number of contributorViews max to 5%.');
print('- New added contributor number in views: '+(new_count-old_count)+' out of total:'+new_count);
print();
var count = db.contributorViews_newOne.find({'books':{$size:0}}).count()
print('> Expected contributor around 55k contributors without book.');
print('- Contributors without books: '+count);
print();
var count = db.contributorViews_newOne.find({ $where: "this.bio.length>150" }).count();
print('> Expected contributor around 171k with bio more then 150 char.');
print('- Contributors with more then 150 char bio: '+count);
print();
var count = db.contributorViews_newOne.find({hasImage:true}).count();
print('> Expected contributor with image around 20k');
print('- Contributors with image : '+count);
print();
print('*********************************************');
print();
print('**********--ReviewView Checks--*********');
print('*********************************************');
var old_count = db.reviewViews.find().count(); var new_count = db.reviewViews_newOne.find().count();
print('> Expected an increase in number of reviewViews max to 5%.');
print('- New added review number in views: '+(new_count-old_count)+' out of total:'+new_count);
print();
var cursor = db.reviewViews_newOne.find({'bookId':'c3a9fd11-21fe-48a5-82cb-b831a6cb18cf'},{'limitedUserReviews':1,_id:0});
var count = cursor[0].limitedUserReviews.length;
print('> Expected Stephen King\'s book to have reviews around 118.');
print('- Reviews for Stephen King\'s book: '+count);
print('*********************************************');
