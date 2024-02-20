// MixForm.js
import styles from "@/styles/mixForm.module.css";
import React, { useState, useEffect, useMemo } from "react";

export default function MixForm({ value, onSubmit, isEditMode }) {
  const [successMessage, setSuccessMessage] = useState("");
  const initialTags = useMemo(() => {
    return value && value.tags
      ? Array.isArray(value.tags)
        ? value.tags.map((tag) => tag.trim())
        : value.tags.split(",").map((tag) => tag.trim())
      : [];
  }, [value]);

  const [tags, setTags] = useState(initialTags);
  const [formValues, setFormValues] = useState({
    imageURL: "",
    url: "",
    title: "",
    city: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    if (isEditMode && value) {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        imageURL: value.imageURL || "",
        url: value.url || "",
        title: value.title || "",
        city: value.city || "",
        description: value.description || "",
        date: formatDate(value.date) || "",
      }));

      setTags(initialTags);
    }
  }, [value, isEditMode, initialTags]);

  const handleTagsChange = (e) => {
    const newTags = e.target.value.split(",").map((tag) => tag.trim());

    const uniqueTags = [...new Set(newTags)];

    setTags(uniqueTags);
  };

  const handleTagDelete = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const formatDate = (dateString) => {
    return dateString;
  };

  const handleInputChange = (field, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      ...formValues,
      tags: tags,
    };

    try {
      await onSubmit(formData);
      setSuccessMessage("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const legendText = isEditMode ? "EDIT MIX" : "ADD MIX";

  return (
    <main className={styles.container}>
      <div className={styles.formContainer}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>{legendText}</legend>
          {successMessage && (
            <div className={styles.successMessage}>{successMessage}</div>
          )}
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="imageURL"></label>
            <input
              className={styles.form}
              type="text"
              id="imageURL"
              name="imageURL"
              placeholder="IMAGE URL:"
              value={formValues.imageURL}
              onChange={(e) => handleInputChange("imageURL", e.target.value)}
            />

            <label htmlFor="url"></label>
            <input
              className={styles.form}
              type="text"
              id="url"
              name="url"
              placeholder="SOUNDCLOUD URL:"
              value={formValues.url}
              onChange={(e) => handleInputChange("url", e.target.value)}
            />

            <label htmlFor="title"></label>
            <input
              className={styles.form}
              type="text"
              id="title"
              name="title"
              placeholder="TITLE:"
              value={formValues.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />

            <label htmlFor="city"></label>
            <input
              className={styles.form}
              type="text"
              id="city"
              name="city"
              placeholder="CITY:"
              value={formValues.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />

            <label htmlFor="description"></label>
            <textarea
              rows="6"
              id="description"
              name="description"
              placeholder="Write your description:"
              className={styles.description}
              value={formValues.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            ></textarea>

            <label htmlFor="date"></label>
            <input
              className={styles.form}
              type="date"
              id="date"
              name="date"
              value={formValues.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
            />

            <label htmlFor="tags"></label>
            <input
              className={styles.form}
              type="text"
              id="tags"
              name="tags"
              value={tags.join(", ")}
              onChange={handleTagsChange}
              placeholder="Enter tags, separated by commas"
            />

            <div>
              {tags.map((tag, index) => (
                <span className={styles.mixTag} key={index}>
                  {tag}
                  <button type="button" onClick={() => handleTagDelete(index)}>
                    Delete
                  </button>
                </span>
              ))}
            </div>

            <button className={styles.button} type="submit">
              Submit
            </button>
          </form>
        </fieldset>
      </div>
    </main>
  );
}
