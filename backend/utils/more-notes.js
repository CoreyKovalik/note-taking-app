const moreNotes = [];
moreNotes.push(["write thank you notes", "matt and lauren"]);
moreNotes.push(["movie watch list", "gone in 60 seconds"]);
moreNotes.push(["Long Note", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa hic consequuntur officia officiis necessitatibus debitis. Reiciendis fugit laboriosam velit, iure corporis quos cum et consectetur debitis blanditiis iusto, fugiat doloremque."]);
moreNotes.push(["Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex velit ea enim itaque ducimus qui dolores, ullam debitis, officia atque expedita nam voluptates nihil nesciunt non quibusdam fuga sit asperiores.", "Long title"]);
moreNotes.push(["empty message", ""]);
moreNotes.push(["", "empty title"]);
moreNotes.push(["",""]);
moreNotes.push(["lunch meeting", "on sunday with Jordan"]);
moreNotes.push(["anticipated video games", "M&B II: Bannerlord"]);
moreNotes.push(["motorcycles", "ducati, yamaha, kawasaki"]);
moreNotes.push(["my pets", "Stewie(cat), Pretzel(snake)"]);

const addMoreNotes = (store, note, notes) => {
    notes.forEach((n) => {
        store.writeNote(new note(n[0], n[1]));
    });
}
module.exports.addMoreNotes = addMoreNotes;
module.exports.moreNotes = moreNotes;