<script>
  import InfoModal from "./lib/Modal.svelte";
  let showModal = false;

  function toggleModal() {
    showModal = !showModal;
  }
</script>

<svelte:head>
  <meta name="robots" content="noindex" />
</svelte:head>

<main id="whiteboard" />

<p id="info">double click to test out clustering methods on random data</p>
<button id="modal-btn" on:click={toggleModal}>Project Information</button>

{#if showModal}
  <InfoModal on:close={toggleModal}>
    <section>
      <h2 class="">Introduction</h2>
      <p>
        The Data Science Whiteboard is an educational tool designed to teach
        data science and machine learning concepts through a visually engaging
        platform. This open-source app aims to make it easier for educators and
        students to interact with data analysis and visualizations in an
        accessible and inclusive way.
      </p>
    </section>
    <section>
      <h2>Background and Motivation</h2>
      <p>
        Development on the Data Science Whiteboard began during the pandemic,
        when remote learning highlighted the challenges of illustrating data
        science concepts visually. The app leverages Processing and ml5js to
        generate data visualizations based on user input, starting with k-means
        clustering as the first featured method. The project received funding
        through the RIOS Working Group grant and is now being expanded to
        incorporate community and social justice-oriented data.
      </p>
    </section>
    <section>
      <h2>Goals and Objectives</h2>
      <p>
        The goal of the Data Science Whiteboard project is to promote
        educational justice, equity, and inclusion in STEM education through the
        use of an interactive whiteboard app. This includes plans to tailor the
        app to meet the needs of diverse student populations, promoting cultural
        responsiveness and inclusivity, and integrating community-oriented data
        sets to foster critical engagement in STEM education.
      </p>
    </section>
    <section>
      <h2>Progress and Future Plans</h2>
      <p>
        Currently, the Data Science Whiteboard supports one clustering method
        and allows users to generate visualizations based on randomly generated
        data. Future plans include integrating more methods, adding sample data
        sets with real-life applications, and further refining the app's
        accessibility and ease of use for educators and students alike. The
        project will continue to receive input and support from the RIOS Working
        Group, with the goal of making STEM education more accessible and
        equitable for all students.
      </p>
    </section>
  </InfoModal>
{/if}

<style>
  #modal-btn {
    position: absolute;
    /* z-index: 9999; */
    top: 0;
    right: 0;
    padding: 0.3rem 0.8rem;
    background: #000;
    color: #fff;
  }
  p {
    padding: 0.5rem 0;
  }
  h2 {
    font-weight: bold;
  }
  #info {
    position: absolute;
    padding: 1rem;
    text-decoration: underline;
    top: 0;
  }
</style>
