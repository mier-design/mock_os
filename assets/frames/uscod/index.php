<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./style.css">
</head>

<body>
    <div onclick="highlightcolors()" class="menu top">

    </div>
    <div class="main">
        <div class="menu left"></div>
        <div class="files left">
            <div class="resizer resizer-r"></div>
        </div>
        <code class="editor">
            <div>//this is a javascript editor, pls note it wont work as expected with other languages</div>
        </code>
    </div>
    <script>
        let cursorposition = 1;
        let cursorelem = false;
        async function getcursorpos(){
            cursorelem = document.getSelection().focusNode;
            cursorposition = document.getSelection().focusOffset;
        }
        async function setcursorpos(that) {
            setTimeout(function(){ that.selectionStart = cursorposition}, 10);
        }
        // Query the element
        const fileselem = document.querySelector('.files.left');
        const editor = document.querySelector('.editor');
        function removeactive() {
            while(document.querySelector(".active")){
                document.querySelector(".active").classList.remove("active");
            }
        }
        let timeout = 0;
        editor.addEventListener('keyup', function(e) {
            let that = window;
            console.log(that, that.selectionStart);
            getcursorpos();
            console.log(that, that.selectionStart);
            highlightcolors();
            console.log(that, that.selectionStart);
            setcursorpos(that);
            console.log(that, that.selectionStart);
        })
        editor.addEventListener('paste', function(e) {
            e.preventDefault()
            var text = e.clipboardData.getData('text/plain')
            document.execCommand('insertText', false, text)
        })
        // The current position of mouse
        let x = 0;
        let y = 0;

        // The dimension of the element
        let w = 0;
        let h = 0;

        // Handle the mousedown event
        // that's triggered when user drags the resizer
        const mouseDownHandler = function(e) {
            // Get the current mouse position
            x = e.clientX;
            // Calculate the dimension of element
            const editorstyle = window.getComputedStyle(editor);
            const styles = window.getComputedStyle(fileselem);
            w = parseInt(styles.width, 10);
            w2 = parseInt(editorstyle.width, 10);
            // Attach the listeners to `document`
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        };

        const mouseMoveHandler = function(e) {
            // How far the mouse has been moved
            const dx = e.clientX - x;
            // Adjust the dimension of element
            fileselem.style.width = `${w + dx}px`;
            editor.style.width = `${w2 - dx}px`;
        };

        const mouseUpHandler = function() {
            // Remove the handlers of `mousemove` and `mouseup`
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };
        const resizers = fileselem.querySelectorAll('.resizer');

        // Loop over them
        [].forEach.call(resizers, function(resizer) {
            resizer.addEventListener('mousedown', mouseDownHandler);
        });
        // change to other line?
        editor.addEventListener("click", function(e) {
            let active = document.querySelectorAll(".active");
            for (i = 0; active.length > i; i++) {
                active[i].classList.remove("active");
            }
            e.target.classList.add("active");
        })
        document.addEventListener("keydown", function(e) {
            if (editor.childNodes[0].nodeName.toLowerCase() != "div") {
                editor.childNodes[0].remove();
                editor.insertAdjacentHTML("afterbegin", "<div><comment>//something went wrong so i have added some first line</comment></div>");
            }
            let fonttag = editor.querySelector("font");
            if (fonttag) {
                fonttag.remove();
            }
            if (e.key == "Enter") {
                if (document.querySelector(".active")) {
                    document.querySelector(".active").classList.remove("active");
                }
            } else if (e.key == "{") {
                // paint?
            } else if (e.key == "ArrowUp") {
                let active = document.querySelector(".active");
                if (active.previousElementSibling != undefined) {
                    active.previousElementSibling.classList.add("active");
                    active.classList.remove("active");
                }
            } else if (e.key == "ArrowDown") {
                let active = editor.querySelector(".active");
                if (active.nextElementSibling != undefined) {
                    active.nextElementSibling.classList.add("active");
                    active.classList.remove("active");
                }
            } else {
                // console.log(e.key, e)
            }
        });

        function highlightcolors(line) {
            let lines = document.querySelectorAll(".editor div");
            if (line) {
                let text = lines[line - 1];
                replace(text);
            } else {
                for (i = 0; lines.length > i; i++) {
                    let text = lines[i];
                    replace(text);
                }
            }
        }

        function replace(text) {
            if(text.innerText == window.getSelection().focusNode){
                console.log("return");
                return;
            }
            let newtext = text.innerText;
            let darkblue = ["var", "let", "(", ")", "{", "}", "$", "function", "const"];
            let purple = ["for", "[", "]", "if", "else"];
            let comments = ["//"];
            newtext = newtext.replace("<vars>", "").replace("</vars>", "").replace("<others>", "").replace("</others>", "").replace("<numbers>", "").replace("</numbers>", "");
            for (j = 0; darkblue.length > j; j++) {
                newtext = newtext.replaceAll(darkblue[j], `<vars>${darkblue[j]}</vars>`);
            }
            for (j = 0; purple.length > j; j++) {
                newtext = newtext.replaceAll(purple[j], `<others>${purple[j]}</others>`);
            }
            for (j = 0; comments.length > j; j++) {
                if (newtext.indexOf(comments[j]) != -1) {
                    newtext = newtext.replace(comments[j], `<comment>${comments[j]}`) + `</comment>`;
                }
            }
            // regex checks for numbers
            if (newtext.match(/\d+/g)) {
                newtext = newtext.replace(/\d+/g, `<numbers>${newtext.match(/\d+/g)[0]}</numbers>`);
            }
            text.setHTML(newtext);
        }
        document.addEventListener("focusout", highlightcolors());
        highlightcolors();
    </script>
</body>

</html>