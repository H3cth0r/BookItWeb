let someDate = "WEDNESDAY 14th AUGUST 2022";

let thisHtml = `
            <div>
                <p>WEDNESDAY 14th AUGUST 2022</p>
                <input id="statsButton" type="image" src="https://github.com/H3cth0r/BookMe/blob/main/BookMe/Assets.xcassets/dateSelectButton.imageset/buttonSelect-2.png?raw=true" name="submit">
            </div>
`

$( document ).ready(function() {
    for(let i = 0; i < 50; i++){
        $("#uBand").append(thisHtml)
        $("#lBand").append(thisHtml)
    }
});