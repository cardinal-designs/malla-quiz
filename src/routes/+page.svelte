<script lang="ts">
  import { setAnswerValue, getAnswerValue, clearAnswerValue } from '@formsort/custom-question-api';
	import { onMount } from 'svelte';
  import { browser } from '$app/environment';

	const min = 1;
	const max = 10;

  let minLabel: string | null;
	let maxLabel: string | null;
	if (browser) {
		const searchParams = new URLSearchParams(window.location.search);
		minLabel = searchParams.get('minLabel');
		maxLabel = searchParams.get('maxLabel');
	}

	let selectedValue: number | undefined = undefined;
	let hoverValue: number | undefined = undefined;

  onMount(async() => {
    selectedValue = await getAnswerValue();
  });

  const clearValue = () => {
		selectedValue = undefined;
		clearAnswerValue();
	};

	const setValue = (newValue: number) => {
		hoverValue = undefined;
		selectedValue = newValue;
		setAnswerValue(newValue);
	};

  const toggleValue = (newValue: number) => {
		if (selectedValue != null && newValue === selectedValue) {
			clearValue();
		} else {
			setValue(newValue);
		}
	};

  const onTouchMove = (e: TouchEvent) => {
		e.preventDefault();
		const location = e.changedTouches[0];
		const target = document.elementFromPoint(location.clientX, location.clientY);
		if (!target) {
			return;
		}
		const datasetValue = (target as HTMLElement).dataset['zoomSliderValue'];
		if (!datasetValue) {
			return;
		}
		const newValue = parseInt(datasetValue);
		if (newValue !== selectedValue) {
			setValue(newValue);
		}
	};

  const gradientValues = ["#BFD44F", "#C8CB4E", "#A4A15D", "#8E7A44", "#97522A", "#9A6D52", "#B67349", "#D06A2A", "#E06010", "#FF6200" ]

  const values: number[] = [];
  for (let i = min; i <= max; i++) {
    values.push(i)
  }
</script>

<svelte:head>
	<style>
	</style>
</svelte:head>

<div 
  on:mouseleave={() => (hoverValue = undefined)}
	on:touchmove={onTouchMove}
	class="buttons"
	style={`grid-template-columns: repeat(${values.length}, 1fr)`}
  role="radiogroup"
>
  {#each values as value, i}
    <button
      role="radio"
      aria-checked="false"
      style="color: {gradientValues[i]};"
      class:neighbor={(selectedValue != null && Math.abs(selectedValue - value) === 1) ||
				(hoverValue != null && Math.abs(hoverValue - value) === 1)}
			class:selected={value === selectedValue || value === hoverValue}
      on:mouseenter={() => (hoverValue = value)}
			on:click={() => toggleValue(value)}
    >
      {value}
    </button>
  {/each}
</div>

{#if minLabel && maxLabel}
	<div class="labels">
		<div>{minLabel}</div>
		<div>{maxLabel}</div>
	</div>
{/if}

<div class="arrow-svg">
  <svg width="164" height="34" viewBox="0 0 164 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M136.568 33.2262L164 16.8776L136.568 0.529053V8.61858H0V25.1366H136.568V33.2262Z" fill="url(#paint0_linear_2637_609)" fill-opacity="0.35"/>
    <path d="M6.892 21.096C8.224 21.096 9.112 20.4 9.112 19.32C9.112 16.548 5.572 18.168 5.572 16.536C5.572 16.008 6.04 15.672 6.748 15.672C7.3 15.672 8.056 15.936 8.14 16.704H9.076C9.004 15.588 8.104 14.856 6.772 14.856C5.5 14.856 4.636 15.528 4.636 16.548C4.636 19.164 8.152 17.544 8.152 19.344C8.152 19.836 7.648 20.256 6.892 20.256C6.016 20.256 5.488 19.836 5.404 19.056H4.48C4.576 20.316 5.488 21.096 6.892 21.096ZM10.4767 21H11.4367V12.468H10.4767V21ZM12.9934 12.468V13.812H14.0974V12.468H12.9934ZM13.0654 21H14.0254V14.952H13.0654V21ZM18.1764 21.096C19.0284 21.096 19.8204 20.664 20.1804 20.004V21H21.1404V12.468H20.1804V15.936C19.8204 15.288 19.0284 14.856 18.1764 14.856C16.2924 14.856 15.2604 16.212 15.2604 17.976C15.2604 19.74 16.2924 21.096 18.1764 21.096ZM18.2604 20.232C17.0484 20.232 16.2444 19.344 16.2444 17.976C16.2444 16.608 17.0484 15.72 18.2604 15.72C19.4724 15.72 20.2644 16.608 20.2644 17.976C20.2644 19.344 19.4724 20.232 18.2604 20.232ZM27.2086 19.056C27.0166 19.812 26.3926 20.244 25.4086 20.244C24.2686 20.244 23.4406 19.356 23.3686 18.108H28.0966C28.1086 18.024 28.1206 17.82 28.1206 17.688C28.1206 16.08 27.0646 14.856 25.3006 14.856C23.5246 14.856 22.4206 16.164 22.4206 17.94C22.4206 19.668 23.6206 21.096 25.4086 21.096C26.9086 21.096 27.9766 20.292 28.1806 19.056H27.2086ZM25.3006 15.672C26.3806 15.672 27.0646 16.32 27.1366 17.34H23.4166C23.5966 16.272 24.2806 15.672 25.3006 15.672ZM32.9325 13.02V14.952H31.6725V15.804H32.9325V19.104C32.9325 20.28 33.6765 21 34.8285 21H35.7525V20.148H34.8645C34.2765 20.148 33.8925 19.752 33.8925 19.08V15.804H35.7525V14.952H33.8925V13.02H32.9325ZM39.3558 21.096C41.1558 21.096 42.4398 19.788 42.4398 17.976C42.4398 16.152 41.1558 14.856 39.3558 14.856C37.5678 14.856 36.2838 16.152 36.2838 17.976C36.2838 19.788 37.5678 21.096 39.3558 21.096ZM39.3558 20.232C38.1198 20.232 37.2678 19.296 37.2678 17.976C37.2678 16.656 38.1198 15.72 39.3558 15.72C40.6038 15.72 41.4558 16.656 41.4558 17.976C41.4558 19.296 40.6038 20.232 39.3558 20.232ZM49.1502 21.096C50.0622 21.096 50.8782 20.664 51.1542 20.1V21H52.1142V14.952H51.1542V15.84C50.7702 15.264 49.9542 14.856 49.1502 14.856C47.2662 14.856 46.2342 16.212 46.2342 17.976C46.2342 19.74 47.2662 21.096 49.1502 21.096ZM49.2342 20.232C48.0222 20.232 47.2182 19.344 47.2182 17.976C47.2182 16.608 48.0222 15.72 49.2342 15.72C50.4462 15.72 51.2382 16.608 51.2382 17.976C51.2382 19.344 50.4462 20.232 49.2342 20.232ZM53.7412 21H54.7012V17.736C54.7012 16.56 55.4452 15.732 56.4772 15.732C57.3892 15.732 57.9892 16.428 57.9892 17.46V21H58.9492V17.304C58.9492 15.828 58.0612 14.856 56.6932 14.856C55.7692 14.856 55.0132 15.276 54.7012 16.116V14.952H53.7412V21ZM62.6381 21.096C63.9701 21.096 64.8581 20.4 64.8581 19.32C64.8581 16.548 61.3181 18.168 61.3181 16.536C61.3181 16.008 61.7861 15.672 62.4941 15.672C63.0461 15.672 63.8021 15.936 63.8861 16.704H64.8221C64.7501 15.588 63.8501 14.856 62.5181 14.856C61.2461 14.856 60.3821 15.528 60.3821 16.548C60.3821 19.164 63.8981 17.544 63.8981 19.344C63.8981 19.836 63.3941 20.256 62.6381 20.256C61.7621 20.256 61.2341 19.836 61.1501 19.056H60.2261C60.3221 20.316 61.2341 21.096 62.6381 21.096ZM67.4231 21H68.3471L69.8231 16.188L71.3111 21H72.2351L74.0711 14.952H73.0991L71.7671 19.752L70.3031 14.952H69.3671L67.8791 19.752L66.5471 14.952H65.5871L67.4231 21ZM79.3687 19.056C79.1767 19.812 78.5527 20.244 77.5687 20.244C76.4287 20.244 75.6007 19.356 75.5287 18.108H80.2567C80.2687 18.024 80.2807 17.82 80.2807 17.688C80.2807 16.08 79.2247 14.856 77.4607 14.856C75.6847 14.856 74.5807 16.164 74.5807 17.94C74.5807 19.668 75.7807 21.096 77.5687 21.096C79.0687 21.096 80.1367 20.292 80.3407 19.056H79.3687ZM77.4607 15.672C78.5407 15.672 79.2247 16.32 79.2967 17.34H75.5767C75.7567 16.272 76.4407 15.672 77.4607 15.672ZM84.9453 15.804V14.952H84.1773C83.2893 14.952 82.7853 15.348 82.5333 16.176V14.952H81.5732V21H82.5333V18.336C82.5333 16.908 82.8813 15.804 84.1053 15.804H84.9453Z" fill="#36190B"/>
    <defs>
    <linearGradient id="paint0_linear_2637_609" x1="0" y1="17" x2="164" y2="17" gradientUnits="userSpaceOnUse">
    <stop offset="0.105853" stop-color="#C0D743"/>
    <stop offset="0.323491" stop-color="#C8CB4E"/>
    <stop offset="0.639418" stop-color="#A4A15D"/>
    <stop offset="1" stop-color="#9A6D52"/>
    </linearGradient>
    </defs>
    </svg>    
</div>

<style>
  @font-face {
    font-family: 'Roobert';
    src: url('https://cdn.shopify.com/s/files/1/0616/4938/7753/files/Roobert-Regular.woff?v=1647044545') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  :global(body) {
		margin: 0;
		font-family: Roobert;
		font-weight: 400;
	}

  div {
    display: grid;
  }

  button {
    background: transparent;
    height: 85px;
    border: none;
    display: inline;
    font-size: 12px;
    padding: 0 0 20px 0;
    transition: all 0.15s ease-in;
    font-family: Roobert, sans-serif;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		text-align: center;
    cursor: pointer;
  }

  button.neighbor {
    font-size: 22px;
    transform: translateY(0.5%);
  }

  button.selected {
    font-size: 80px;
    transform: translateY(20%);
  }

  .arrow-svg {
    margin:10px 0;
    display: block;
  }

  .labels {
		display: flex;
		justify-content: space-between;
    color: #36190B;
	}
</style>