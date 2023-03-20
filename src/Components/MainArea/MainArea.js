import React, { useState, useEffect } from "react";
import "./MainArea.css";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuiv4 } from "uuid";
//PAGE HOME
export default function MainArea() {
    //premiere etape ajout 2.
  const [inpInfo, setInpInfo] = useState({
    title: "",
    subtitle: "",
    body: "",
  });
 //modifier 4.
  const [inpModify, setInpModify] = useState({
    title: "",
    subtitle: "",
    body: "",
  });

  const selected = useSelector((state) => state.selectedReducer.selectedNote);

  useEffect(() => {
    setInpModify(selected)
  }, [selected])

  const dispatch = useDispatch();

  const [validation, setValidation] = useState(true);


  //mettre a jour automatiquement les champs d'une notes
  const updateInputs = (e) => {
      //je recupere l'id="" d'un <input>
    const actualInp = e.target.getAttribute("id");
    //s
    if (selected.toggle) {
      const newObjState = { ...inpModify, [actualInp]: e.target.value };
      setInpModify(newObjState);
    } else if (selected.toggle === false) {
        //premiere étape ajout
      const newObjState = { ...inpInfo, [actualInp]: e.target.value };
      setInpInfo(newObjState);
    }
  };

  const handleForm = (e) => {
    e.preventDefault();

    if(selected.toggle){
        if(selected.title.length < 1){
            setValidation(false)
            return;
        }

        setValidation(true);
        
        dispatch({
            type: "UPDATENOTE",
            payload: inpModify
        })
        dispatch({
            type: "RESETNOTE"
        })
        setInpModify({
            title: "",
            subtitle: "",
            body: ""
        })

    } else if (selected.toggle === false){
        //premiere étape ajout
        if (inpInfo.title.length < 1) {
            setValidation(false);
            return;
          }
      
          setValidation(true);
      
          dispatch({
            type: "ADDNOTE",
            payload: {
              ...inpInfo,
              id: uuiv4(),
            },
          });
        //à la validation je supprime les info affiché dans le form
          setInpInfo({
            title: "",
            subtitle: "",
            body: "",
          });
    }
  };

  return (
    <div className="container-content">
      <h2>Votre plume</h2>

      <form onSubmit={handleForm}>
        <label htmlFor="title">Le Titre</label>
        <input
          value={inpModify.toggle ? inpModify.title : inpInfo.title}
          onChange={updateInputs}
          type="text"
          id="title"
        />
        {!validation && (
          <span className="info-validation">Veuillez renseigner un titre.</span>
        )}

        <label htmlFor="subtitle">Sous-titre</label>
        <input
          value={inpModify.toggle ? inpModify.subtitle : inpInfo.subtitle}
          onChange={updateInputs}
          type="text"
          id="subtitle"
        />

        <label htmlFor="body">Votre Texte</label>
        <textarea
          value={inpModify.toggle ? inpModify.body : inpInfo.body}
          onChange={updateInputs}
          id="body"
          placeholder="Votre texte ..."
        ></textarea>

        <button>Enregistrer</button>
      </form>
    </div>
  );
}
