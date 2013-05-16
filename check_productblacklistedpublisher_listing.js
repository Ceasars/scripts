var count_different_publisher = 0;
var count_different_publisher_withinventory = 0;
var book_count = 0; 
var total_books= db.books.count(); var run_count=0;

var Albatross= 0;
var AndrewsMcMeelPublishing= 0;
var Atlas= 0;
var BertramsBooksLtd= 0;
var CountrymanPress= 0;
var DalkeyArchivePress= 0;
var Europa= 0;
var Fantagraphics= 0;
var GeorgeBrazillerInc= 0;
var Harlequin= 0;
var HarperCollinsPublishers= 0;
var HarperCollinsPublishersLtd= 0;
var Hatchette= 0;
var hachetteBGU= 0;
var HoughtonMifflin= 0;
var HoughtonMifflinCompany= 0;
var IndependentPubGroup= 0;
var IngramPublisherServices= 0;
var InnerTraditions= 0;
var JohnWileySons= 0;
var Liveright= 0;
var MPS= 0;
var NationalBookCompanyInc= 0;
var NewDirections= 0;
var NewHarbingerPublications= 0;
var Overlook= 0;
var Pegasus= 0;
var PenguinGroupUS= 0;
var PenguinGroupUSAInc= 0;
var Persea= 0;
var Perseus= 0;
var RandomHouseDigitalInc= 0;
var RandomHouseInc= 0;
var ReaderDigest= 0;
var SimonSchuster= 0;
var SimonSchusterUK= 0;
var SourcebooksInc= 0;
var ThamesHudson= 0;
var TuttlePublishing= 0;
var Verso= 0;
var Wiley= 0;
var WWNortonCompany= 0;

for (var i=0;i<300000;i=i+100000){
	var cursor = db.books.find().skip(i).limit(i+100000);
	cursor.forEach(compare);

	if ( i % 1000000 == 0) {
		// printjson(run_count);
		print('Total Number of books that their blacklisted by publisherId: '+book_count);
		print('Total Number of different publisher product number: ' +count_different_publisher);
		print('Total Number of different publisher product with inventory entry: '+count_different_publisher_withinventory);
	}
}




function compare (book){
	// run_count++;
	if ( book.hasOwnProperty('publisherInfo') && book.publisherInfo.hasOwnProperty('publisherId') 
		&& db.pblacklist.findOne({'_id': book.publisherInfo.publisherId}) != null  ){
		book_count++;
		book.products.forEach(function (productRef) {
			var product = db.products.findOne({isbn13:productRef.isbn13});
			if (  product !== null && product.hasOwnProperty('publisherInfo') ) {
				if( db.pblacklist.findOne({"_id" : product.publisherInfo.publisherId}) == null ){
					if ( db.inventories.findOne({isbn13:product.isbn13}) != null ){
						// print('Book: '+book.id);
						// print('With Inventory: ');
						// printjson(product.isbn13);
						count_different_publisher_withinventory ++;
					} else  {
						// printjson(product.isbn13);
						count_different_publisher++;
						fpublisher(product);

					}
				}
			}
		});
	};
	
};



function fpublisher (x)  {
                        switch(x.publisherInfo.supplier) {
                           case  'Hachette Book Group USA': 
                               hachetteBGU++;
                               break
                           case 'Andrews McMeel Publishing':
                                AndrewsMcMeelPublishing++;
                               break;
                               case 'Atlas':
                                Atlas++;
                               break;
                               case 'Bertrams Books Ltd.':
                                BertramsBooksLtd++;
                               break;
                               case 'Countryman Press':
                                CountrymanPress++;
                               break;
                               case 'Dalkey Archive Press':
                                DalkeyArchivePress++;
                               break;
                               case 'Europa':
                                Europa++;
                               break;
                               case 'Fantagraphics':
                                Fantagraphics++;
                               break;
                               case 'George Braziller Inc.':
                                GeorgeBrazillerInc++;
                               break;
                               case 'Harlequin':
                                Harlequin++;
                               break;
                               case 'HarperCollins Publishers':
                                HarperCollinsPublishers++;
                               break;
                               case 'HarperCollins Publishers Ltd.':
                                HarperCollinsPublishersLtd++;
                               break;
                               case 'Hatchette':
                                Hatchette++;
                               break;
                               case 'Houghton Mifflin':
                                HoughtonMifflin++;
                               break;
                               case 'Houghton Mifflin Company':
                                HoughtonMifflinCompany++;
                               break;
                               case 'Independent Pub Group':
                                IndependentPubGroup++;
                               break;
                               case 'Ingram Publisher Services':
                                IngramPublisherServices++;
                               break;
                               case 'Inner Traditions':
                                InnerTraditions++;
                               break;
                               case 'John Wiley & Sons':
                                JohnWileySons++;
                               break;
                               case 'Liveright':
                                Liveright++;
                               break;
                               case 'MPS':
                                MPS++;
                               break;
                               case 'National Book Company, Inc.':
                                NationalBookCompanyInc++;
                               break;
                               case 'New Directions':
                                NewDirections++;
                               break;
                               case 'New Harbinger Publications':
                                NewHarbingerPublications++;
                               break;
                               case 'Overlook':
                                Overlook++;
                               break;
                               case 'Pegasus':
                                Pegasus++;
                               break;
                               case 'Penguin Group US':
                                PenguinGroupUS++;
                               break;
                               case 'Penguin Group USA, Inc':
                                PenguinGroupUSAInc++;
                               break;
                               case 'Persea':
                                Persea++;
                               break;
                               case 'Perseus':
                                Perseus++;
                               break;
                               case 'Random House Digital, Inc.':
                                RandomHouseDigitalInc++;
                               break;
                               case 'Random House, Inc.':
                                RandomHouseInc++;
                               break;
                               case 'Reader\'s Digest':
                                ReaderDigest++;
                               break;
                               case 'Simon & Schuster':
                                SimonSchuster++;
                               break;
                               case 'Simon & Schuster UK':
                                SimonSchusterUK++;
                               break;
                               case 'Sourcebooks, Inc.':
                                     SourcebooksInc++;
                               break;
                               case 'Thames & Hudson':
                                ThamesHudson++;
                               break;
                               case 'Tuttle Publishing':
                                TuttlePublishing++;
                               break;
                               case 'Verso':
                                Verso++;
                               break;
                               case 'Wiley':
                                Wiley++;
                               break;
                               default : 
                                  {otherpub++;}
                          };

};

print('Number of books that their blacklisted by publisherId: '+book_count);
print('Number of different publisher product number: ' +(count_different_publisher+count_different_publisher_withinventory));
print('Number of different publisher product with inventory entry: '+count_different_publisher_withinventory);


print('There are '+hachetteBGU+' books with Hachette effected with Hachette.');
print('There are '+otherpub+' books with other publisher effected with unknown pub.');
print('There are '+Albatross+' books with other publisher effected with Albatross.');
print('There are '+AndrewsMcMeelPublishing+' books with other publisher effected with Andrews.');
print('There are '+Atlas+' books with other publisher effected with .');
print('There are ' +BertramsBooksLtd+' books from BertramsBooksLtd have incorrect or missing Display Names.');
print('There are ' +CountrymanPress+' books from CountrymanPress have incorrect or missing Display Names.');
print('There are ' +DalkeyArchivePress+' books from DalkeyArchivePress have incorrect or missing Display Names.');
print('There are ' +Europa+' books from Europa have incorrect or missing Display Names.');
print('There are ' +Fantagraphics+' books from Fantagraphics have incorrect or missing Display Names.');
print('There are ' +GeorgeBrazillerInc+' books from GeorgeBrazillerInc have incorrect or missing Display Names.');
print('There are ' +Harlequin+' books from Harlequin have incorrect or missing Display Names.');
print('There are ' +HarperCollinsPublishers+' books from HarperCollinsPublishers have incorrect or missing Display Names.');
print('There are ' +HarperCollinsPublishersLtd+' books from HarperCollinsPublishersLtd have incorrect or missing Display Names.');
print('There are ' +Hatchette+' books from Hatchette have incorrect or missing Display Names.');
print('There are ' +HoughtonMifflin+' books from HoughtonMifflin have incorrect or missing Display Names.');
print('There are ' +HoughtonMifflinCompany+' books from HoughtonMifflinCompany have incorrect or missing Display Names.');
print('There are ' +IndependentPubGroup+' books from IndependentPubGroup have incorrect or missing Display Names.');
print('There are ' +IngramPublisherServices+' books from IngramPublisherServices have incorrect or missing Display Names.');
print('There are ' +InnerTraditions+' books from InnerTraditions have incorrect or missing Display Names.');
print('There are ' +JohnWileySons+' books from JohnWileySons have incorrect or missing Display Names.');
print('There are ' +Liveright+' books from Liveright have incorrect or missing Display Names.');
print('There are ' +MPS+' books from MPS have incorrect or missing Display Names.');
print('There are ' +NationalBookCompanyInc+' books from NationalBookCompanyInc have incorrect or missing Display Names.');
print('There are ' +NewDirections+' books from NewDirections have incorrect or missing Display Names.');
print('There are ' +NewHarbingerPublications+' books from NewHarbingerPublications have incorrect or missing Display Names.');
print('There are ' +Overlook+' books from Overlook have incorrect or missing Display Names.');
print('There are ' +Pegasus+' books from Pegasus have incorrect or missing Display Names.');
print('There are ' +PenguinGroupUS+' books from PenguinGroupUS have incorrect or missing Display Names.');
print('There are ' +PenguinGroupUSAInc+' books from PenguinGroupUSAInc have incorrect or missing Display Names.');
print('There are ' +Persea+' books from Persea have incorrect or missing Display Names.');
print('There are ' +Perseus+' books from Perseus have incorrect or missing Display Names.');
print('There are ' +RandomHouseDigitalInc+' books from RandomHouseDigitalInc have incorrect or missing Display Names.');
print('There are ' +RandomHouseInc+' books from RandomHouseInc have incorrect or missing Display Names.');
print('There are ' +ReaderDigest+' books from ReaderDigest have incorrect or missing Display Names.');
print('There are ' +SimonSchuster+' books from SimonSchuster have incorrect or missing Display Names.');
print('There are ' +SimonSchusterUK+' books from SimonSchusterUK have incorrect or missing Display Names.');
print('There are ' +SourcebooksInc+' books from SourcebooksInc have incorrect or missing Display Names.');
print('There are ' +ThamesHudson+' books from ThamesHudson have incorrect or missing Display Names.');
print('There are ' +TuttlePublishing+' books from TuttlePublishing have incorrect or missing Display Names.');
print('There are ' +Verso+' books from Verso have incorrect or missing Display Names.');
print('There are ' +Wiley+' books from Wiley have incorrect or missing Display Names.');
print('There are ' +WWNortonCompany+' books from WWNortonCompany have incorrect or missing Display Names.');

